import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '@5pro/db';
import { authenticate, authorize } from '../middleware/auth';
import { auditLog } from '../middleware/audit';
import { ApiError } from '../middleware/error';

const router = Router();

const createRequestSchema = z.object({
  projectName: z.string(),
  description: z.string().optional(),
  inputParams: z.any(),
  status: z.string().default('pending'),
});

const createResultSchema = z.object({
  fileType: z.string(),
  fileUrl: z.string(),
  fileSize: z.number().optional(),
});

// List 3D requests
router.get(
  '/',
  authenticate,
  authorize('visual3d', 'read'),
  async (req: any, res, next) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [requests, total] = await Promise.all([
        prisma.visual3DRequest.findMany({
          skip,
          take: limit,
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
            results: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.visual3DRequest.count(),
      ]);

      res.json({
        data: requests,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get 3D request by ID
router.get(
  '/:id',
  authenticate,
  authorize('visual3d', 'read'),
  async (req, res, next) => {
    try {
      const request = await prisma.visual3DRequest.findUnique({
        where: { id: req.params.id },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          results: true,
        },
      });

      if (!request) {
        throw new ApiError(404, '3D request not found');
      }

      res.json(request);
    } catch (error) {
      next(error);
    }
  }
);

// Create 3D request
router.post(
  '/',
  authenticate,
  authorize('visual3d', 'create'),
  auditLog('create', 'visual3d'),
  async (req: any, res, next) => {
    try {
      const data = createRequestSchema.parse(req.body);

      const request = await prisma.visual3DRequest.create({
        data: {
          ...data,
          userId: req.user.id,
        },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  }
);

// Update 3D request
router.put(
  '/:id',
  authenticate,
  authorize('visual3d', 'update'),
  auditLog('update', 'visual3d'),
  async (req, res, next) => {
    try {
      const data = createRequestSchema.partial().parse(req.body);

      const request = await prisma.visual3DRequest.update({
        where: { id: req.params.id },
        data,
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          results: true,
        },
      });

      res.json(request);
    } catch (error) {
      next(error);
    }
  }
);

// Delete 3D request
router.delete(
  '/:id',
  authenticate,
  authorize('visual3d', 'delete'),
  auditLog('delete', 'visual3d'),
  async (req, res, next) => {
    try {
      await prisma.visual3DRequest.delete({
        where: { id: req.params.id },
      });

      res.json({ message: '3D request deleted' });
    } catch (error) {
      next(error);
    }
  }
);

// Add result to request
router.post(
  '/:id/results',
  authenticate,
  authorize('visual3d', 'update'),
  auditLog('add_result', 'visual3d'),
  async (req, res, next) => {
    try {
      const data = createResultSchema.parse(req.body);

      const result = await prisma.visual3DResult.create({
        data: {
          requestId: req.params.id,
          ...data,
        },
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router as visual3dRouter };


import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '@5pro/db';
import { authenticate, authorize } from '../middleware/auth';
import { auditLog } from '../middleware/audit';
import { ApiError } from '../middleware/error';

const router = Router();

const createEstimateSchema = z.object({
  projectName: z.string(),
  description: z.string().optional(),
  status: z.string().default('draft'),
});

const createVersionSchema = z.object({
  inputData: z.any(),
  resultData: z.any().optional(),
});

// List estimates
router.get(
  '/',
  authenticate,
  authorize('estimates', 'read'),
  async (req: any, res, next) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [estimates, total] = await Promise.all([
        prisma.estimate.findMany({
          skip,
          take: limit,
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
            versions: {
              orderBy: { versionNum: 'desc' },
              take: 1,
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.estimate.count(),
      ]);

      res.json({
        data: estimates,
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

// Get estimate by ID
router.get(
  '/:id',
  authenticate,
  authorize('estimates', 'read'),
  async (req, res, next) => {
    try {
      const estimate = await prisma.estimate.findUnique({
        where: { id: req.params.id },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          versions: {
            orderBy: { versionNum: 'asc' },
          },
        },
      });

      if (!estimate) {
        throw new ApiError(404, 'Estimate not found');
      }

      res.json(estimate);
    } catch (error) {
      next(error);
    }
  }
);

// Create estimate
router.post(
  '/',
  authenticate,
  authorize('estimates', 'create'),
  auditLog('create', 'estimates'),
  async (req: any, res, next) => {
    try {
      const data = createEstimateSchema.parse(req.body);

      const estimate = await prisma.estimate.create({
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

      res.status(201).json(estimate);
    } catch (error) {
      next(error);
    }
  }
);

// Update estimate
router.put(
  '/:id',
  authenticate,
  authorize('estimates', 'update'),
  auditLog('update', 'estimates'),
  async (req, res, next) => {
    try {
      const data = createEstimateSchema.partial().parse(req.body);

      const estimate = await prisma.estimate.update({
        where: { id: req.params.id },
        data,
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      res.json(estimate);
    } catch (error) {
      next(error);
    }
  }
);

// Delete estimate
router.delete(
  '/:id',
  authenticate,
  authorize('estimates', 'delete'),
  auditLog('delete', 'estimates'),
  async (req, res, next) => {
    try {
      await prisma.estimate.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Estimate deleted' });
    } catch (error) {
      next(error);
    }
  }
);

// Create version
router.post(
  '/:id/versions',
  authenticate,
  authorize('estimates', 'update'),
  auditLog('create_version', 'estimates'),
  async (req: any, res, next) => {
    try {
      const data = createVersionSchema.parse(req.body);

      // Get latest version number
      const latestVersion = await prisma.estimateVersion.findFirst({
        where: { estimateId: req.params.id },
        orderBy: { versionNum: 'desc' },
      });

      const versionNum = (latestVersion?.versionNum || 0) + 1;

      const version = await prisma.estimateVersion.create({
        data: {
          estimateId: req.params.id,
          versionNum,
          ...data,
        },
      });

      res.status(201).json(version);
    } catch (error) {
      next(error);
    }
  }
);

export { router as estimatesRouter };


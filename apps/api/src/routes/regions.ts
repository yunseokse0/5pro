import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '@5pro/db';
import { authenticate, authorize } from '../middleware/auth';
import { auditLog } from '../middleware/audit';
import { ApiError } from '../middleware/error';

const router = Router();

const createRegionSchema = z.object({
  name: z.string(),
  code: z.string().optional(),
  costIndex: z.number().default(1.0),
});

// List regions
router.get(
  '/',
  authenticate,
  authorize('regions', 'read'),
  async (req, res, next) => {
    try {
      const regions = await prisma.region.findMany({
        orderBy: { name: 'asc' },
      });

      res.json(regions);
    } catch (error) {
      next(error);
    }
  }
);

// Get region by ID
router.get(
  '/:id',
  authenticate,
  authorize('regions', 'read'),
  async (req, res, next) => {
    try {
      const region = await prisma.region.findUnique({
        where: { id: req.params.id },
      });

      if (!region) {
        throw new ApiError(404, 'Region not found');
      }

      res.json(region);
    } catch (error) {
      next(error);
    }
  }
);

// Create region
router.post(
  '/',
  authenticate,
  authorize('regions', 'create'),
  auditLog('create', 'regions'),
  async (req, res, next) => {
    try {
      const data = createRegionSchema.parse(req.body);

      const region = await prisma.region.create({
        data,
      });

      res.status(201).json(region);
    } catch (error) {
      next(error);
    }
  }
);

// Update region
router.put(
  '/:id',
  authenticate,
  authorize('regions', 'update'),
  auditLog('update', 'regions'),
  async (req, res, next) => {
    try {
      const data = createRegionSchema.partial().parse(req.body);

      const region = await prisma.region.update({
        where: { id: req.params.id },
        data,
      });

      res.json(region);
    } catch (error) {
      next(error);
    }
  }
);

// Delete region
router.delete(
  '/:id',
  authenticate,
  authorize('regions', 'delete'),
  auditLog('delete', 'regions'),
  async (req, res, next) => {
    try {
      await prisma.region.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Region deleted' });
    } catch (error) {
      next(error);
    }
  }
);

export { router as regionsRouter };


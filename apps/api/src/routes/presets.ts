import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '@5pro/db';
import { authenticate, authorize } from '../middleware/auth';
import { auditLog } from '../middleware/audit';
import { ApiError } from '../middleware/error';

const router = Router();

const createPresetSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  config: z.any().optional(),
});

// List presets
router.get(
  '/',
  authenticate,
  authorize('presets', 'read'),
  async (req, res, next) => {
    try {
      const presets = await prisma.industryPreset.findMany({
        orderBy: { name: 'asc' },
      });

      res.json(presets);
    } catch (error) {
      next(error);
    }
  }
);

// Get preset by ID
router.get(
  '/:id',
  authenticate,
  authorize('presets', 'read'),
  async (req, res, next) => {
    try {
      const preset = await prisma.industryPreset.findUnique({
        where: { id: req.params.id },
      });

      if (!preset) {
        throw new ApiError(404, 'Preset not found');
      }

      res.json(preset);
    } catch (error) {
      next(error);
    }
  }
);

// Create preset
router.post(
  '/',
  authenticate,
  authorize('presets', 'create'),
  auditLog('create', 'presets'),
  async (req, res, next) => {
    try {
      const data = createPresetSchema.parse(req.body);

      const preset = await prisma.industryPreset.create({
        data,
      });

      res.status(201).json(preset);
    } catch (error) {
      next(error);
    }
  }
);

// Update preset
router.put(
  '/:id',
  authenticate,
  authorize('presets', 'update'),
  auditLog('update', 'presets'),
  async (req, res, next) => {
    try {
      const data = createPresetSchema.partial().parse(req.body);

      const preset = await prisma.industryPreset.update({
        where: { id: req.params.id },
        data,
      });

      res.json(preset);
    } catch (error) {
      next(error);
    }
  }
);

// Delete preset
router.delete(
  '/:id',
  authenticate,
  authorize('presets', 'delete'),
  auditLog('delete', 'presets'),
  async (req, res, next) => {
    try {
      await prisma.industryPreset.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Preset deleted' });
    } catch (error) {
      next(error);
    }
  }
);

export { router as presetsRouter };


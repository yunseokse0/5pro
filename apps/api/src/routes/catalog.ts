import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '@5pro/db';
import { authenticate, authorize } from '../middleware/auth';
import { auditLog } from '../middleware/audit';
import { ApiError } from '../middleware/error';

const router = Router();

const createCatalogItemSchema = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string().optional(),
  unitPrice: z.number(),
  unit: z.string().default('ea'),
  supplier: z.string().optional(),
  specs: z.any().optional(),
  isActive: z.boolean().default(true),
});

// List catalog items
router.get(
  '/',
  authenticate,
  authorize('catalog', 'read'),
  async (req: any, res, next) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const category = req.query.category as string;

      const where = category ? { category } : {};

      const [items, total] = await Promise.all([
        prisma.catalogItem.findMany({
          where,
          skip,
          take: limit,
          orderBy: { name: 'asc' },
        }),
        prisma.catalogItem.count({ where }),
      ]);

      res.json({
        data: items,
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

// Get catalog item by ID
router.get(
  '/:id',
  authenticate,
  authorize('catalog', 'read'),
  async (req, res, next) => {
    try {
      const item = await prisma.catalogItem.findUnique({
        where: { id: req.params.id },
      });

      if (!item) {
        throw new ApiError(404, 'Catalog item not found');
      }

      res.json(item);
    } catch (error) {
      next(error);
    }
  }
);

// Create catalog item
router.post(
  '/',
  authenticate,
  authorize('catalog', 'create'),
  auditLog('create', 'catalog'),
  async (req, res, next) => {
    try {
      const data = createCatalogItemSchema.parse(req.body);

      const item = await prisma.catalogItem.create({
        data,
      });

      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }
);

// Update catalog item
router.put(
  '/:id',
  authenticate,
  authorize('catalog', 'update'),
  auditLog('update', 'catalog'),
  async (req, res, next) => {
    try {
      const data = createCatalogItemSchema.partial().parse(req.body);

      const item = await prisma.catalogItem.update({
        where: { id: req.params.id },
        data,
      });

      res.json(item);
    } catch (error) {
      next(error);
    }
  }
);

// Delete catalog item
router.delete(
  '/:id',
  authenticate,
  authorize('catalog', 'delete'),
  auditLog('delete', 'catalog'),
  async (req, res, next) => {
    try {
      await prisma.catalogItem.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Catalog item deleted' });
    } catch (error) {
      next(error);
    }
  }
);

export { router as catalogRouter };


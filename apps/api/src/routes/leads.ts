import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '@5pro/db';
import { authenticate, authorize } from '../middleware/auth';
import { auditLog } from '../middleware/audit';
import { ApiError } from '../middleware/error';

const router = Router();

const createLeadSchema = z.object({
  companyName: z.string(),
  contactName: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  source: z.string().optional(),
  status: z.string().default('new'),
  notes: z.string().optional(),
  estimatedBudget: z.number().optional(),
});

// List leads
router.get(
  '/',
  authenticate,
  authorize('leads', 'read'),
  async (req: any, res, next) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [leads, total] = await Promise.all([
        prisma.lead.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.lead.count(),
      ]);

      res.json({
        data: leads,
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

// Get lead by ID
router.get(
  '/:id',
  authenticate,
  authorize('leads', 'read'),
  async (req, res, next) => {
    try {
      const lead = await prisma.lead.findUnique({
        where: { id: req.params.id },
      });

      if (!lead) {
        throw new ApiError(404, 'Lead not found');
      }

      res.json(lead);
    } catch (error) {
      next(error);
    }
  }
);

// Create lead
router.post(
  '/',
  authenticate,
  authorize('leads', 'create'),
  auditLog('create', 'leads'),
  async (req, res, next) => {
    try {
      const data = createLeadSchema.parse(req.body);

      const lead = await prisma.lead.create({
        data,
      });

      res.status(201).json(lead);
    } catch (error) {
      next(error);
    }
  }
);

// Update lead
router.put(
  '/:id',
  authenticate,
  authorize('leads', 'update'),
  auditLog('update', 'leads'),
  async (req, res, next) => {
    try {
      const data = createLeadSchema.partial().parse(req.body);

      const lead = await prisma.lead.update({
        where: { id: req.params.id },
        data,
      });

      res.json(lead);
    } catch (error) {
      next(error);
    }
  }
);

// Delete lead
router.delete(
  '/:id',
  authenticate,
  authorize('leads', 'delete'),
  auditLog('delete', 'leads'),
  async (req, res, next) => {
    try {
      await prisma.lead.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Lead deleted' });
    } catch (error) {
      next(error);
    }
  }
);

export { router as leadsRouter };


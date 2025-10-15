import { Router } from 'express';
import { z } from 'zod';
import { prisma, PartnerGrade } from '@5pro/db';
import { authenticate, authorize } from '../middleware/auth';
import { auditLog } from '../middleware/audit';
import { ApiError } from '../middleware/error';

const router = Router();

const createPartnerSchema = z.object({
  companyName: z.string(),
  contactName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  grade: z.nativeEnum(PartnerGrade).default(PartnerGrade.BRONZE),
  totalRevenue: z.number().default(0),
  projectCount: z.number().default(0),
});

const createAchievementSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  achievedAt: z.string().optional(),
});

// List partners
router.get(
  '/',
  authenticate,
  authorize('partners', 'read'),
  async (req: any, res, next) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [partners, total] = await Promise.all([
        prisma.partner.findMany({
          skip,
          take: limit,
          include: {
            achievements: {
              take: 3,
              orderBy: { achievedAt: 'desc' },
            },
            projects: {
              take: 5,
              orderBy: { createdAt: 'desc' },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.partner.count(),
      ]);

      res.json({
        data: partners,
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

// Get partner by ID
router.get(
  '/:id',
  authenticate,
  authorize('partners', 'read'),
  async (req, res, next) => {
    try {
      const partner = await prisma.partner.findUnique({
        where: { id: req.params.id },
        include: {
          achievements: {
            orderBy: { achievedAt: 'desc' },
          },
          projects: {
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      if (!partner) {
        throw new ApiError(404, 'Partner not found');
      }

      res.json(partner);
    } catch (error) {
      next(error);
    }
  }
);

// Create partner
router.post(
  '/',
  authenticate,
  authorize('partners', 'create'),
  auditLog('create', 'partners'),
  async (req, res, next) => {
    try {
      const data = createPartnerSchema.parse(req.body);

      const partner = await prisma.partner.create({
        data,
      });

      res.status(201).json(partner);
    } catch (error) {
      next(error);
    }
  }
);

// Update partner
router.put(
  '/:id',
  authenticate,
  authorize('partners', 'update'),
  auditLog('update', 'partners'),
  async (req, res, next) => {
    try {
      const data = createPartnerSchema.partial().parse(req.body);

      const partner = await prisma.partner.update({
        where: { id: req.params.id },
        data,
      });

      res.json(partner);
    } catch (error) {
      next(error);
    }
  }
);

// Delete partner
router.delete(
  '/:id',
  authenticate,
  authorize('partners', 'delete'),
  auditLog('delete', 'partners'),
  async (req, res, next) => {
    try {
      await prisma.partner.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Partner deleted' });
    } catch (error) {
      next(error);
    }
  }
);

// Achievements
router.get('/:id/achievements', authenticate, authorize('partners', 'read'), async (req, res, next) => {
  try {
    const achievements = await prisma.partnerAchievement.findMany({
      where: { partnerId: req.params.id },
      orderBy: { achievedAt: 'desc' },
    });
    res.json(achievements);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/achievements', authenticate, authorize('partners', 'update'), auditLog('add_achievement', 'partners'), async (req, res, next) => {
  try {
    const data = createAchievementSchema.parse(req.body);
    const achievement = await prisma.partnerAchievement.create({
      data: {
        partnerId: req.params.id,
        ...data,
        achievedAt: data.achievedAt ? new Date(data.achievedAt) : new Date(),
      },
    });
    res.status(201).json(achievement);
  } catch (error) {
    next(error);
  }
});

export { router as partnersRouter };


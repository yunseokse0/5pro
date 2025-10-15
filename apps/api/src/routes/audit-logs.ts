import { Router } from 'express';
import { prisma } from '@5pro/db';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// List audit logs
router.get(
  '/',
  authenticate,
  authorize('audit_logs', 'read'),
  async (req: any, res, next) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const resource = req.query.resource as string;

      const where = resource ? { resource } : {};

      const [logs, total] = await Promise.all([
        prisma.auditLog.findMany({
          where,
          skip,
          take: limit,
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.auditLog.count({ where }),
      ]);

      res.json({
        data: logs,
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

export { router as auditLogsRouter };


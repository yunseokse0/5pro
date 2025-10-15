import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '@5pro/db';
import { authenticate, authorize } from '../middleware/auth';
import { auditLog } from '../middleware/audit';
import { ApiError } from '../middleware/error';

const router = Router();

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  phone: z.string().optional(),
  roleId: z.string(),
  status: z.string().default('active'),
});

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  roleId: z.string().optional(),
  status: z.string().optional(),
});

// List users
router.get(
  '/',
  authenticate,
  authorize('users', 'read'),
  async (req: any, res, next) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const search = req.query.search as string;
      const role = req.query.role as string;
      const status = req.query.status as string;

      const where: any = {};
      
      if (search) {
        where.OR = [
          { name: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
        ];
      }
      
      if (role && role !== 'all') {
        where.roleId = role;
      }
      
      if (status && status !== 'all') {
        where.status = status;
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          skip,
          take: limit,
          include: {
            role: true,
            _count: {
              select: {
                estimates: true,
                projects: true,
                contracts: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.user.count({ where }),
      ]);

      res.json({
        data: users,
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

// Get user by ID
router.get(
  '/:id',
  authenticate,
  authorize('users', 'read'),
  async (req, res, next) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.params.id },
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
          estimates: {
            take: 5,
            orderBy: { createdAt: 'desc' },
          },
          projects: {
            take: 5,
            orderBy: { createdAt: 'desc' },
          },
          contracts: {
            take: 5,
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Create user
router.post(
  '/',
  authenticate,
  authorize('users', 'create'),
  auditLog('create', 'users'),
  async (req, res, next) => {
    try {
      const data = createUserSchema.parse(req.body);

      // Check if email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new ApiError(400, 'Email already exists');
      }

      const user = await prisma.user.create({
        data,
        include: {
          role: true,
        },
      });

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Update user
router.put(
  '/:id',
  authenticate,
  authorize('users', 'update'),
  auditLog('update', 'users'),
  async (req, res, next) => {
    try {
      const data = updateUserSchema.parse(req.body);

      const user = await prisma.user.update({
        where: { id: req.params.id },
        data,
        include: {
          role: true,
        },
      });

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Delete user
router.delete(
  '/:id',
  authenticate,
  authorize('users', 'delete'),
  auditLog('delete', 'users'),
  async (req, res, next) => {
    try {
      await prisma.user.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'User deleted' });
    } catch (error) {
      next(error);
    }
  }
);

// Get user stats
router.get(
  '/stats/overview',
  authenticate,
  authorize('users', 'read'),
  async (req, res, next) => {
    try {
      const [totalUsers, activeUsers, pendingUsers, adminUsers] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { status: 'active' } }),
        prisma.user.count({ where: { status: 'pending' } }),
        prisma.user.count({ 
          where: { 
            role: { name: 'admin' } 
          } 
        }),
      ]);

      res.json({
        totalUsers,
        activeUsers,
        pendingUsers,
        adminUsers,
      });
    } catch (error) {
      next(error);
    }
  }
);

export { router as usersRouter };

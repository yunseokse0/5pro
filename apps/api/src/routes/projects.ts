import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '@5pro/db';
import { authenticate, authorize } from '../middleware/auth';
import { auditLog } from '../middleware/audit';
import { ApiError } from '../middleware/error';

const router = Router();

const createProjectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  partnerId: z.string().optional(),
  regionId: z.string().optional(),
  presetId: z.string().optional(),
  status: z.string().default('planning'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budget: z.number().optional(),
  actualCost: z.number().optional(),
  progress: z.number().default(0),
});

const createMilestoneSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.string().default('pending'),
  order: z.number().default(0),
});

const createEnvLogSchema = z.object({
  temperature: z.number().optional(),
  humidity: z.number().optional(),
  co2Level: z.number().optional(),
  recordedAt: z.string().optional(),
});

const createLiveFeedSchema = z.object({
  cameraName: z.string(),
  streamUrl: z.string(),
  isActive: z.boolean().default(true),
});

const createHaccpStageSchema = z.object({
  stageName: z.string(),
  description: z.string().optional(),
  criteria: z.any().optional(),
  status: z.string().default('pending'),
  order: z.number().default(0),
});

// List projects
router.get(
  '/',
  authenticate,
  authorize('projects', 'read'),
  async (req: any, res, next) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [projects, total] = await Promise.all([
        prisma.project.findMany({
          skip,
          take: limit,
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
            partner: true,
            region: true,
            preset: true,
            milestones: {
              take: 5,
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.project.count(),
      ]);

      res.json({
        data: projects,
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

// Get project by ID
router.get(
  '/:id',
  authenticate,
  authorize('projects', 'read'),
  async (req, res, next) => {
    try {
      const project = await prisma.project.findUnique({
        where: { id: req.params.id },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          partner: true,
          region: true,
          preset: true,
          milestones: {
            orderBy: { order: 'asc' },
          },
          envLogs: {
            orderBy: { recordedAt: 'desc' },
            take: 50,
          },
          liveFeeds: true,
          haccpStages: {
            orderBy: { order: 'asc' },
          },
        },
      });

      if (!project) {
        throw new ApiError(404, 'Project not found');
      }

      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);

// Create project
router.post(
  '/',
  authenticate,
  authorize('projects', 'create'),
  auditLog('create', 'projects'),
  async (req: any, res, next) => {
    try {
      const data = createProjectSchema.parse(req.body);

      const project = await prisma.project.create({
        data: {
          ...data,
          startDate: data.startDate ? new Date(data.startDate) : undefined,
          endDate: data.endDate ? new Date(data.endDate) : undefined,
          userId: req.user.id,
        },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          partner: true,
          region: true,
          preset: true,
        },
      });

      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }
);

// Update project
router.put(
  '/:id',
  authenticate,
  authorize('projects', 'update'),
  auditLog('update', 'projects'),
  async (req, res, next) => {
    try {
      const data = createProjectSchema.partial().parse(req.body);

      const project = await prisma.project.update({
        where: { id: req.params.id },
        data: {
          ...data,
          startDate: data.startDate ? new Date(data.startDate) : undefined,
          endDate: data.endDate ? new Date(data.endDate) : undefined,
        },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          partner: true,
          region: true,
          preset: true,
        },
      });

      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);

// Delete project
router.delete(
  '/:id',
  authenticate,
  authorize('projects', 'delete'),
  auditLog('delete', 'projects'),
  async (req, res, next) => {
    try {
      await prisma.project.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Project deleted' });
    } catch (error) {
      next(error);
    }
  }
);

// Milestones
router.get('/:id/milestones', authenticate, authorize('projects', 'read'), async (req, res, next) => {
  try {
    const milestones = await prisma.projectMilestone.findMany({
      where: { projectId: req.params.id },
      orderBy: { order: 'asc' },
    });
    res.json(milestones);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/milestones', authenticate, authorize('projects', 'update'), auditLog('add_milestone', 'projects'), async (req, res, next) => {
  try {
    const data = createMilestoneSchema.parse(req.body);
    const milestone = await prisma.projectMilestone.create({
      data: {
        projectId: req.params.id,
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      },
    });
    res.status(201).json(milestone);
  } catch (error) {
    next(error);
  }
});

// Environment logs
router.get('/:id/env', authenticate, authorize('projects', 'read'), async (req, res, next) => {
  try {
    const logs = await prisma.projectEnvLog.findMany({
      where: { projectId: req.params.id },
      orderBy: { recordedAt: 'desc' },
      take: 100,
    });
    res.json(logs);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/env', authenticate, authorize('projects', 'update'), auditLog('add_env_log', 'projects'), async (req: any, res, next) => {
  try {
    const data = createEnvLogSchema.parse(req.body);
    const log = await prisma.projectEnvLog.create({
      data: {
        projectId: req.params.id,
        ...data,
        recordedAt: data.recordedAt ? new Date(data.recordedAt) : new Date(),
        recordedBy: req.user.id,
      },
    });
    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
});

// Live feeds
router.get('/:id/live', authenticate, authorize('projects', 'read'), async (req, res, next) => {
  try {
    const feeds = await prisma.projectLiveFeed.findMany({
      where: { projectId: req.params.id },
    });
    res.json(feeds);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/live', authenticate, authorize('projects', 'update'), auditLog('add_live_feed', 'projects'), async (req: any, res, next) => {
  try {
    const data = createLiveFeedSchema.parse(req.body);
    const feed = await prisma.projectLiveFeed.create({
      data: {
        projectId: req.params.id,
        ...data,
        createdBy: req.user.id,
      },
    });
    res.status(201).json(feed);
  } catch (error) {
    next(error);
  }
});

// HACCP stages
router.get('/:id/haccp', authenticate, authorize('projects', 'read'), async (req, res, next) => {
  try {
    const stages = await prisma.haccpStage.findMany({
      where: { projectId: req.params.id },
      orderBy: { order: 'asc' },
    });
    res.json(stages);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/haccp', authenticate, authorize('projects', 'update'), auditLog('add_haccp_stage', 'projects'), async (req, res, next) => {
  try {
    const data = createHaccpStageSchema.parse(req.body);
    const stage = await prisma.haccpStage.create({
      data: {
        projectId: req.params.id,
        ...data,
      },
    });
    res.status(201).json(stage);
  } catch (error) {
    next(error);
  }
});

export { router as projectsRouter };


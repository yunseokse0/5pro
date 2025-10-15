import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '@5pro/db';
import { authenticate, authorize } from '../middleware/auth';
import { auditLog } from '../middleware/audit';
import { ApiError } from '../middleware/error';

const router = Router();

const createContractSchema = z.object({
  projectId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  totalAmount: z.number(),
  status: z.string().default('draft'),
});

const createClauseSchema = z.object({
  title: z.string(),
  content: z.string(),
  order: z.number().default(0),
});

const signContractSchema = z.object({
  signerName: z.string(),
  signerRole: z.string().optional(),
});

// List contracts
router.get(
  '/',
  authenticate,
  authorize('contracts', 'read'),
  async (req: any, res, next) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [contracts, total] = await Promise.all([
        prisma.contract.findMany({
          skip,
          take: limit,
          include: {
            project: {
              select: { id: true, name: true },
            },
            user: {
              select: { id: true, name: true, email: true },
            },
            signatures: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.contract.count(),
      ]);

      res.json({
        data: contracts,
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

// Get contract by ID
router.get(
  '/:id',
  authenticate,
  authorize('contracts', 'read'),
  async (req, res, next) => {
    try {
      const contract = await prisma.contract.findUnique({
        where: { id: req.params.id },
        include: {
          project: true,
          user: {
            select: { id: true, name: true, email: true },
          },
          clauses: {
            orderBy: { order: 'asc' },
          },
          signatures: true,
        },
      });

      if (!contract) {
        throw new ApiError(404, 'Contract not found');
      }

      res.json(contract);
    } catch (error) {
      next(error);
    }
  }
);

// Create contract
router.post(
  '/',
  authenticate,
  authorize('contracts', 'create'),
  auditLog('create', 'contracts'),
  async (req: any, res, next) => {
    try {
      const data = createContractSchema.parse(req.body);

      const contract = await prisma.contract.create({
        data: {
          ...data,
          userId: req.user.id,
        },
        include: {
          project: true,
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      res.status(201).json(contract);
    } catch (error) {
      next(error);
    }
  }
);

// Update contract
router.put(
  '/:id',
  authenticate,
  authorize('contracts', 'update'),
  auditLog('update', 'contracts'),
  async (req, res, next) => {
    try {
      const data = createContractSchema.partial().parse(req.body);

      const contract = await prisma.contract.update({
        where: { id: req.params.id },
        data,
        include: {
          project: true,
          user: {
            select: { id: true, name: true, email: true },
          },
          clauses: true,
          signatures: true,
        },
      });

      res.json(contract);
    } catch (error) {
      next(error);
    }
  }
);

// Delete contract
router.delete(
  '/:id',
  authenticate,
  authorize('contracts', 'delete'),
  auditLog('delete', 'contracts'),
  async (req, res, next) => {
    try {
      await prisma.contract.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Contract deleted' });
    } catch (error) {
      next(error);
    }
  }
);

// Clauses
router.get('/:id/clauses', authenticate, authorize('contracts', 'read'), async (req, res, next) => {
  try {
    const clauses = await prisma.contractClause.findMany({
      where: { contractId: req.params.id },
      orderBy: { order: 'asc' },
    });
    res.json(clauses);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/clauses', authenticate, authorize('contracts', 'update'), auditLog('add_clause', 'contracts'), async (req, res, next) => {
  try {
    const data = createClauseSchema.parse(req.body);
    const clause = await prisma.contractClause.create({
      data: {
        contractId: req.params.id,
        ...data,
      },
    });
    res.status(201).json(clause);
  } catch (error) {
    next(error);
  }
});

// Signatures
router.get('/:id/signatures', authenticate, authorize('contracts', 'read'), async (req, res, next) => {
  try {
    const signatures = await prisma.signature.findMany({
      where: { contractId: req.params.id },
    });
    res.json(signatures);
  } catch (error) {
    next(error);
  }
});

// Sign contract
router.post('/:id/sign', authenticate, authorize('contracts', 'update'), auditLog('sign', 'contracts'), async (req: any, res, next) => {
  try {
    const data = signContractSchema.parse(req.body);

    const signature = await prisma.signature.create({
      data: {
        contractId: req.params.id,
        userId: req.user.id,
        signerName: data.signerName,
        signerRole: data.signerRole,
        ipAddress: req.ip,
        signedAt: new Date(),
      },
    });

    res.status(201).json(signature);
  } catch (error) {
    next(error);
  }
});

export { router as contractsRouter };


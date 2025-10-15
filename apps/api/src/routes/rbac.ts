import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/me', authenticate, async (req: any, res, next) => {
  try {
    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

export { router as rbacRouter };


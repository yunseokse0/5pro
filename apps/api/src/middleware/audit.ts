import { Response, NextFunction } from 'express';
import { prisma } from '@5pro/db';
import { AuthRequest } from './auth';

export const auditLog = (action: string, resource: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const originalSend = res.json;

    res.json = function (data: any) {
      // Log after successful response
      if (res.statusCode >= 200 && res.statusCode < 300) {
        prisma.auditLog
          .create({
            data: {
              userId: req.user?.id,
              action,
              resource,
              resourceId: req.params.id || data?.id,
              metadata: {
                method: req.method,
                path: req.path,
                body: req.body,
              },
              ipAddress: req.ip,
            },
          })
          .catch((err: any) => console.error('Audit log error:', err));
      }

      return originalSend.call(this, data);
    };

    next();
  };
};


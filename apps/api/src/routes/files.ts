import { Router } from 'express';
import { z } from 'zod';
import AWS from 'aws-sdk';
import { authenticate } from '../middleware/auth';
import { ApiError } from '../middleware/error';

const router = Router();

const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION || 'us-east-1',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

const signSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
  operation: z.enum(['putObject', 'getObject']),
});

router.post('/sign', authenticate, async (req, res, next) => {
  try {
    const { fileName, fileType, operation } = signSchema.parse(req.body);

    const params = {
      Bucket: process.env.S3_BUCKET || '5pro-uploads',
      Key: `uploads/${Date.now()}-${fileName}`,
      Expires: 3600, // 1 hour
      ContentType: operation === 'putObject' ? fileType : undefined,
    };

    const url = s3.getSignedUrl(operation, params);

    res.json({
      url,
      key: params.Key,
    });
  } catch (error) {
    next(error);
  }
});

export { router as filesRouter };


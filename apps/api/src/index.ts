import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error';
import { authRouter } from './routes/auth';
import { rbacRouter } from './routes/rbac';
import { estimatesRouter } from './routes/estimates';
import { visual3dRouter } from './routes/visual3d';
import { projectsRouter } from './routes/projects';
import { contractsRouter } from './routes/contracts';
import { partnersRouter } from './routes/partners';
import { leadsRouter } from './routes/leads';
import { catalogRouter } from './routes/catalog';
import { regionsRouter } from './routes/regions';
import { presetsRouter } from './routes/presets';
import { filesRouter } from './routes/files';
import { auditLogsRouter } from './routes/audit-logs';

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter);
app.use('/rbac', rbacRouter);
app.use('/estimates', estimatesRouter);
app.use('/visual3d', visual3dRouter);
app.use('/projects', projectsRouter);
app.use('/contracts', contractsRouter);
app.use('/partners', partnersRouter);
app.use('/leads', leadsRouter);
app.use('/catalog', catalogRouter);
app.use('/regions', regionsRouter);
app.use('/presets', presetsRouter);
app.use('/files', filesRouter);
app.use('/audit-logs', auditLogsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 API server running on port ${PORT}`);
});


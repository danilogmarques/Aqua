import { Router } from 'express';
import { analyticsController, customerController, serviceController } from '../controllers/index.js';
import { healthRoutes } from './healthRoutes.js';

export const apiRoutes = Router();

apiRoutes.use(healthRoutes);
apiRoutes.get('/clientes', customerController.list);
apiRoutes.get('/servicos', serviceController.list);
apiRoutes.get('/relatorios/analytics', analyticsController.list);
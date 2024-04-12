import { Router } from 'express';

import { CategoryController } from '@controllers';

const categoryRoutes = Router();

categoryRoutes.get('/', CategoryController.getAll);

export default categoryRoutes;

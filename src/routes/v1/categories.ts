import { Router } from 'express';

import { CategoryController } from '@controllers';
import { retrieveCache } from '@middlewares';

const categoryRoutes = Router();

categoryRoutes.get('/', retrieveCache, CategoryController.getAll);

export default categoryRoutes;

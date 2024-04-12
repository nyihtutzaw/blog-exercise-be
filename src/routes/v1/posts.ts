import { Router } from 'express';

import { PostController } from '@controllers';
import { retrieveCache } from '@middlewares';

const postRoutes = Router();

postRoutes.get('/', retrieveCache, PostController.getAll);
postRoutes.get('/:id', retrieveCache, PostController.get);

export default postRoutes;

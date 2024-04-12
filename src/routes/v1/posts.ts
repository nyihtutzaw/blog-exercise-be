import { Router } from 'express';

import { PostController } from '@controllers';

const postRoutes = Router();

postRoutes.get('/', PostController.getAll);

export default postRoutes;

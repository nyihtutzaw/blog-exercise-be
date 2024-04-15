import { Router } from 'express';

import { PostController } from '@controllers';
import { retrieveCache, validate, createPostSchema, authenticateUser } from '@middlewares';

const postRoutes = Router();

postRoutes.get('/', retrieveCache, PostController.getAll);
postRoutes.get('/:id', retrieveCache, PostController.get);

postRoutes.post('/', authenticateUser, validate(createPostSchema), PostController.store);
postRoutes.delete('/:id', authenticateUser, PostController.delete);
postRoutes.put('/:id', authenticateUser, validate(createPostSchema), PostController.update);

export default postRoutes;

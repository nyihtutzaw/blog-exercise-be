import { Router } from 'express';

import usersRoutes from './users';
import categoryRoutes from './categories';
import postRoutes from './posts';

const routes_v1 = Router();

routes_v1.use('/users', usersRoutes);

routes_v1.use('/categories', categoryRoutes);

routes_v1.use('/posts', postRoutes);

export default routes_v1;

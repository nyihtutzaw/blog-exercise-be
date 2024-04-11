import { Router } from 'express';

import usersRoutes from './users';

const routes_v1 = Router();

routes_v1.use('/users', usersRoutes);

export default routes_v1;

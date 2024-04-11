import { Router } from 'express';

const usersRoutes = Router();

usersRoutes.get('/', (req, res) => res.send('hi'));

export default usersRoutes;

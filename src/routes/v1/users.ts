import { Router } from 'express';
import { UserController } from '@controllers';
import { userRegisterValidation, userLoginValidation, validate, retrieveCache, authenticateUser } from '@middlewares';

const usersRoutes = Router();

usersRoutes.post('/register', validate(userRegisterValidation), UserController.register);
usersRoutes.post('/login', validate(userLoginValidation), UserController.login);

usersRoutes.get('/find/:id', retrieveCache, UserController.get);
usersRoutes.get('/profile', authenticateUser, UserController.profile);
usersRoutes.get('/', retrieveCache, UserController.getAll);

export default usersRoutes;

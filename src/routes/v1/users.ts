import { Router } from 'express';
import { UserController } from '@controllers';
import { userRegisterValidation, userLoginValidation, validate } from '@middlewares';

const usersRoutes = Router();

usersRoutes.post('/register', validate(userRegisterValidation), UserController.register);
usersRoutes.post('/login', validate(userLoginValidation), UserController.login);

usersRoutes.get('/:id', UserController.get);

export default usersRoutes;

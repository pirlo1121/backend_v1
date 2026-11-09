import express from 'express';
import { createUsers, getUserById, getUsers, login, logout, updateUser } from '../controllers/users.controllers.js';
import { auth, isAdmin } from '../middlewares/auth.middleware.js';
const usersRouter = express.Router();

// rutas publicas
usersRouter.post('/users', createUsers);   // registro
usersRouter.post('/login', login);
usersRouter.post('/logout', logout);

// rutas privadas
usersRouter.get('/users', auth, isAdmin, getUsers);
usersRouter.get('/users/:id', auth, getUserById);
usersRouter.patch('/users/:id', auth, isAdmin, updateUser);

export default usersRouter ;

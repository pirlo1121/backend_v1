import express from 'express';
import { createUsers, getUserById, getUsers, login, logout, updateUser } from '../controllers/users.controllers.js';
const usersRouter = express.Router();

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', getUserById);
usersRouter.post('/users', createUsers);
usersRouter.patch('/users/:id', updateUser);
usersRouter.post('/login', login);
usersRouter.post('/logout', logout)

export default usersRouter

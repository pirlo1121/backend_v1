import express from 'express';
import { createUsers, getUsers, login, updateUser } from '../controllers/users.controllers.js';
const usersRouter = express.Router();

usersRouter.get('/users', getUsers);
usersRouter.post('/users', createUsers);
usersRouter.patch('/users/:id', updateUser);
usersRouter.post('/login', login);

export default usersRouter

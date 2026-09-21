import express from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/users.controllers.js';
const usersRouter = express.Router();

usersRouter.get('/users', getUsers)
usersRouter.post('/users', createUser)
usersRouter.delete('/users/:id', deleteUser)
usersRouter.patch('/users/:id', updateUser)


export default usersRouter

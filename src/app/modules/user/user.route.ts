import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/users',UserControllers.createUser)
router.get('/users', UserControllers.getUsers);
router.get('/users/:userId', UserControllers.getSingleUser);
router.delete('/users/:userId', UserControllers.deleteSingleUser);

export const UserRoutes=router
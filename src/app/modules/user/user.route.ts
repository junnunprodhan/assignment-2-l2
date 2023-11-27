import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/users',UserControllers.createUser)
router.get('/users', UserControllers.getUsers);
router.get('/users/:userId', UserControllers.getSingleUser);
router.delete('/users/:userId', UserControllers.deleteSingleUser);
router.put('/users/:userId', UserControllers.updateUser);
router.put('/users/:userId/orders', UserControllers.updateOrders);
router.get('/users/:userId/orders', UserControllers.getOrders);

export const UserRoutes=router
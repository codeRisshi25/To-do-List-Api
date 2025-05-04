import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js'
import { getTasksController } from '../controllers/taskController.js'

const router = express.Router();
const getTasks = router.get('/user/tasks',authenticateToken,getTasksController);

export {
    getTasks
}
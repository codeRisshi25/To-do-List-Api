import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js'
import { getTasksController , addTasksController} from '../controllers/taskController.js'

const router = express.Router();
const getTasks = router.get('/tasks',authenticateToken,getTasksController);
const addTasks = router.post('/addtasks',authenticateToken,addTasksController);

export {
    getTasks,
    addTasks
}
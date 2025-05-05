import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js'
import { getTasksController , addTasksController , updateTaskCompletionController} from '../controllers/taskController.js'

const router = express.Router();
const getTasks = router.get('/get',authenticateToken,getTasksController);
const addTasks = router.post('/add',authenticateToken,addTasksController);
const updateTaskCompletion = router.patch('/:tid/status',authenticateToken,updateTaskCompletionController)

export {
    getTasks,
    addTasks,
    updateTaskCompletion
}
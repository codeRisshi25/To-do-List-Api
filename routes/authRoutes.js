import express from 'express';
import {loginController, signupController, logoutController ,getTasksController} from '../controllers/authController.js';
import authenticateToken from '../middleware/authenticateToken.js'

const router = express.Router();

const login = router.post('/login',loginController)
const signup = router.post('/signup',signupController)
const logout = router.post('/logout',logoutController)
const getTasks = router.post('./user/tasks',getTasksController);

export {login , signup, logout, getTasks}
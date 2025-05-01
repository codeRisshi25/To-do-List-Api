import express from './express';
import {loginController, signupController, logoutController} from './controllers/authControllers';

const router = express.Router();

const login = router.post('./login',loginController)
const signup = router.post('./signup',signupController)
const logout = router.post('./logout',logoutController)

export {login , signup, logout}
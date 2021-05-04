import express from "express";
const router = express.Router();
import {loginController,registerController} from '../controllers/auth.js';

router.post('/login',loginController) // /auth/login
router.post('/register',registerController)

export default router;

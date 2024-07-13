
import express from 'express';
import { AllUsers, Login, Signup } from '../controller/user.js';
import { jwtAuthMiddleware } from '../middleware/jwtAuthMiddleware.js';
const router = express.Router();

router.route('/signup').post(Signup);
router.route('/login').post(Login);
router.route('/').get(jwtAuthMiddleware,AllUsers);
export default router;
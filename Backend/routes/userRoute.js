
import express from 'express';
import { allUsers, login, signup } from '../controller/user.js';
import { jwtAuthMiddleware } from '../middleware/jwtAuthMiddleware.js';
const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/').get(jwtAuthMiddleware , allUsers);
export default router;

import express from 'express';
import { Login, Signup } from '../controller/user.js';
const router = express.Router();

router.route('/signup').post(Signup);
router.route('/login').post(Login);

export default router;
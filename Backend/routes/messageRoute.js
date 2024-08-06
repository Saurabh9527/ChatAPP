
import express from 'express';
import { jwtAuthMiddleware } from '../middleware/jwtAuthMiddleware.js';
import { allMessages, sendMessage } from '../controller/message.js';
const router = express.Router();

router.route('/').post(jwtAuthMiddleware, sendMessage);
router.route('/:chatId').get(jwtAuthMiddleware, allMessages);

export default router;
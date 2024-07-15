
import express from 'express';
const router = express.Router();
import { jwtAuthMiddleware } from '../middleware/jwtAuthMiddleware.js';
import { accessChat, fetchChats } from '../controller/chat.js';

router.route('/').post(jwtAuthMiddleware, accessChat); //one - on - one chat
router.route('/').get(jwtAuthMiddleware, fetchChats);
// router.route('/group').post(jwtAuthMiddleware, createGroupChat);
// router.route('/rename').put(jwtAuthMiddleware, renameGroup);
// router.route('groupremove').put(jwtAuthMiddleware, removeFromGroup);
// router.route('/groupadd').put(jwtAuthMiddleware, addToGroup);

export default router;
import express from 'express';
import isAuthorized from '../middleware/isAuthorized.js';
import { getMyConversations, getOrCreateConversation, sendMessage } from '../controllers/chat.controller.js';

const router = express.Router();

router.post("/get-conversation",isAuthorized,getOrCreateConversation)
router.post("/send-message",isAuthorized,sendMessage)
router.get("/get-conversations",isAuthorized,getMyConversations)

export default router;

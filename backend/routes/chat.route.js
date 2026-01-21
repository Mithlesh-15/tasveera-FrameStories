import express from 'express';
import isAuthorized from '../middleware/isAuthorized.js';
import { getOrCreateConversation } from '../controllers/chat.controller.js';

const router = express.Router();

router.post("/get-conversation",isAuthorized,getOrCreateConversation)

export default router;

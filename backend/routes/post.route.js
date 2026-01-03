import express from 'express';
import upload from "../middleware/upload.js"
import { createPost, showOnePost } from '../controllers/post.controller.js';
import isAuthorized from '../middleware/isAuthorized.js';
import { isFollowed, isOwner } from '../middleware/isCheak.js';

const router = express.Router();

router.post("/upload",isAuthorized,upload.single("media"),createPost)
router.post("/show-one-post",isAuthorized,isOwner,isFollowed,showOnePost)


export default router;

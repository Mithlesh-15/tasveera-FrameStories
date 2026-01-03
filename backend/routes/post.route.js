import express from 'express';
import upload from "../middleware/upload.js"
import { createPost, givingInfo, showOnePost } from '../controllers/post.controller.js';
import isAuthorized from '../middleware/isAuthorized.js';
import { isFollowed, isLike, isOwner } from '../middleware/isCheak.js';

const router = express.Router();

router.post("/upload",isAuthorized,upload.single("media"),createPost)
router.post("/show-one-post",isAuthorized,showOnePost)
router.post("/is-like-follow-owner",isAuthorized,isOwner,isFollowed,isLike,givingInfo)


export default router;

import express from 'express';
import upload from "../middleware/upload.js"
import { createPost } from '../controllers/post.controller.js';

const router = express.Router();

router.post("/upload",upload.single("media"),createPost)


export default router;

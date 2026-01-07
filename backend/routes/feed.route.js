import express from "express";
import { getImageFeed, getVideoFeed } from "../controllers/feed.controller.js";
import isAuthorized from "../middleware/isAuthorized.js";

const router = express.Router();

router.get("/images", isAuthorized, getImageFeed);
router.get("/videos", isAuthorized, getVideoFeed);

export default router;

import express from "express";
import { getImageFeed } from "../controllers/feed.controller.js";
import isAuthorized from "../middleware/isAuthorized.js";

const router = express.Router();

router.get("/images", isAuthorized, getImageFeed);

export default router;

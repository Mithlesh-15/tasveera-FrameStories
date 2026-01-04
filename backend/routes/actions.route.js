import express from "express";
import isAuthorized from "../middleware/isAuthorized.js";
import { followUser, unfollowUser } from "../controllers/actions.controller.js";

const router = express.Router();

router.post("/unfollow", isAuthorized, unfollowUser);
router.post("/follow", isAuthorized, followUser);

export default router;
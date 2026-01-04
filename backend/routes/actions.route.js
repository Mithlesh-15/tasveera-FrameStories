import express from "express";
import isAuthorized from "../middleware/isAuthorized.js";
import {
  dislikePost,
  followUser,
  likePost,
  unfollowUser,
} from "../controllers/actions.controller.js";

const router = express.Router();

router.post("/unfollow", isAuthorized, unfollowUser);
router.post("/follow", isAuthorized, followUser);
router.post("/like", isAuthorized, likePost);
router.post("/dislike", isAuthorized, dislikePost);

export default router;

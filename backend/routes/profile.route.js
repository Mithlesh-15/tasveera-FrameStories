import express from "express";
import isAuthorized from "../middleware/isAuthorized.js";
import {
  getMyProfile,
  getPostForProfile,
  getProfileDetail,
  updateProfile,
} from "../controllers/profile.controller.js";
import upload from "../middleware/upload.js";
import { isFollowed, isOwner } from '../middleware/isCheak.js';

const router = express.Router();

router.get("/get-my-details", isAuthorized, getMyProfile);
router.post("/get-profile-details", isAuthorized, isOwner,isFollowed, getProfileDetail);
router.post("/get-one-post", getPostForProfile);
router.post(
  "/update-profile",
  isAuthorized,
  upload.single("media"),
  updateProfile
);

export default router;

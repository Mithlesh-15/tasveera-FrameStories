import express from "express";
import isAuthorized from "../middleware/isAuthorized.js";
import { unfollowUser } from "../controllers/actions.controller.js";

const router = express.Router();

router.post("/unfollow", isAuthorized, unfollowUser);

export default router;
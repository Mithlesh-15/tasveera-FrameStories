import express from 'express';
import isAuthorized from '../middleware/isAuthorized.js';
import { getMyProfile, getPostForProfile, getProfileDetail } from '../controllers/phofile.controller.js';

const router = express.Router();

router.get("/get-my-details",isAuthorized,getMyProfile)
router.post("/get-profile-details",isAuthorized,getProfileDetail)
router.post("/get-one-post",getPostForProfile)
export default router;

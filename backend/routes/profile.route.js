import express from 'express';
import isAuthorized from '../middleware/isAuthorized.js';
import { getMyProfile, getProfileDetail } from '../controllers/phofile.controller.js';

const router = express.Router();

router.get("/get-my-details",isAuthorized,getMyProfile)
router.post("/get-profile-details",isAuthorized,getProfileDetail)


export default router;

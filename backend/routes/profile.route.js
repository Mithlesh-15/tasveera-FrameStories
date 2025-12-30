import express from 'express';
import isAuthorized from '../middleware/isAuthorized.js';
import { getMyProfile } from '../controllers/phofile.controller.js';

const router = express.Router();

router.get("/get-my-details",isAuthorized,getMyProfile)


export default router;

import express from 'express';
import { AuthProvider, login, logout, signup } from '../controllers/registration.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/auth-provider', AuthProvider);


export default router;

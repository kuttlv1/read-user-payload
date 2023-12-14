// routes/userDetailRoute.js
import express from 'express';
import { saveUserDetails } from '../controller/saveUserDetailController.js';
import { createSms } from '../controller/sms-controller.js';

const router = express.Router();

router.post('/save-user-details', saveUserDetails); 
router.post('/read-sms', createSms);

export default router;

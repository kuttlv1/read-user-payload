// routes/userDetailRoute.js
import express from 'express';
import { saveUserDetails } from '../controller/saveUserDetailController.js';  // Adjusted path


const router = express.Router();

router.post('/save-user-details', saveUserDetails); 

export default router;

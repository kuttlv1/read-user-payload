// routes/userDetailRoute.js
import express from 'express';
import { saveUserDetails } from '../controller/saveUserDetailController.js';  // Adjusted path


const router = express.Router();

router.post('/saveUserDetails', saveUserDetails); 

export default router;

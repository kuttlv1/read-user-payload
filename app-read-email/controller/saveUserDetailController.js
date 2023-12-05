// controllers/saveUserDetailController.js
import PayloadModel from "../model/emailModel.js";  // Adjusted path and removed braces since default export


export const saveUserDetails = async (req, res) => {
  try {
    const payloadData = req.body;

    // Save payload to MongoDB
    const savedPayload = await PayloadModel.create(payloadData);

    res.status(201).json({ success: true, data: savedPayload });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.threadID) {
      // Handle duplicate threadID error
      res.status(400).json({ success: false, error: 'Duplicate threadID' });
    } else {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
};

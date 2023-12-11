// controllers/saveUserDetailController.js
import PayloadModel from "../model/emailModel.js";  // Adjusted path and removed braces since default export


export const saveUserDetails = async (req, res) => {
  try {
    const payloadData = req.body;

    console.log(JSON.stringify({payloadData}))

    //Validate the payload

    if (!payloadData || Object.keys(payloadData).length === 0) {
      return res.status(400).json({ success: false, error: 'Payload is empty' });
    }

    // Save payload to MongoDB
const savedPayload = await PayloadModel.create(payloadData);

    res.status(201).json({ success: true, data: savedPayload });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern['messages.messageId']) {
      // Handle duplicate messageId error
      res.status(400).json({ success: false, error: 'Duplicate messageId' });
    } else {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
};

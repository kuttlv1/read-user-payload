import Sms from "../model/sms-model.js";

export const createSms = async (req, res) => {
    try {
      const { address, body, thread_id, date, dateSent } = req.body;
  
      // Check if required fields are present
      if (!address || !body || !date) {
        return res.status(400).json({ error: 'Required fields are missing.' });
      }
  
      // Create a new instance of the Sms model with the provided payload
      const newSms = new Sms({
        address,
        body,
        thread_id,
        date,
        dateSent,
      });
  
      // Save the new SMS to the MongoDB collection
      const savedSms = await newSms.save();
  
      // Respond with the saved SMS
      res.status(201).json(savedSms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

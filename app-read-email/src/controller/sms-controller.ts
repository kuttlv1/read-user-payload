import {Request ,Response } from 'express';
import SmsModel, { SmsDocument }from "../model/sms-model.js";

export const createSms = async (req:Request, res:Response) => {
    try {
      const { address, body, thread_id, date, dateSent } = req.body;
  
      // Check if required fields are present
      if (!address || !body || !date) {
        return res.status(400).json({ error: 'Required fields are missing.' });
      }

      
      // Convert date string to Date object
      const formattedDate = new Date(date);
      const formattedDateSent = dateSent ? new Date(dateSent) : null;

  
      // Create a new instance of the Sms model with the provided payload
      const newSms : SmsDocument = new SmsModel({
        address,
        body,
        thread_id,
        date:formattedDate,
        dateSent:formattedDateSent,
      });
  
      // Save the new SMS to the MongoDB collection
      const savedSms : SmsDocument = await newSms.save();
  
      // Respond with the saved SMS
      res.status(201).json(savedSms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

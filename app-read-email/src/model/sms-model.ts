import mongoose,{Document , Schema } from 'mongoose';

// Define the schema for the SMS model
interface Sms {
  address:string;
  body:string;
  thread_id?: string;
  date:Date;
  dateSent?: Date | null;
}

export interface SmsDocument extends Sms, Document{}

const smsSchema = new mongoose.Schema({
    address: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    thread_id: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    dateSent: {
      type: Date,
    },
  });
  
  // Create the SMS model
  const SmsModel = mongoose.model<SmsDocument>('Sms', smsSchema);
  
  export default SmsModel;
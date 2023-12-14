import mongoose from 'mongoose';

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
      type: Number,
    },
    date: {
      type: Date,
      required: true,
    },
    dateSent: {
      type: Date,
    },
  });
  
  const Sms = mongoose.model('Sms', smsSchema);
  
  export default Sms;
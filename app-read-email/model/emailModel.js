import mongoose from 'mongoose';

// Message schema to include headers, body, and attachment
const messageSchema = new mongoose.Schema({
  threadId: { type: String, required: true },
  messageId: { type: String, required: true, unique: true },
  headers: {
    Subject: String,
    deviceId: String,
    From: String,
    To: String,
    'date-time': String
  },
  body: String,
  attachment: [String] // Assuming attachments are represented as an array of strings (e.g., file paths or URLs)
});

const payloadSchema = new mongoose.Schema({
  messages: [messageSchema]
  
});

const PayloadModel = mongoose.model('Payload', payloadSchema);

export default PayloadModel;

import mongoose from 'mongoose';

// Modified message schema to include headers, body, and attachment
const messageSchema = new mongoose.Schema({
  messageID: { type: String, unique: true },
  headers: {
    'Message-ID': String,
    Subject: String,
    deviceId: String,
    From: String,
    To: String,
    'date-time': String
  },
  body: String,
  attachment: [String] // Assuming attachments are represented as an array of strings (e.g., file paths or URLs)
});

const threadSchema = new mongoose.Schema({
  threadID: { type: String, required: true },
  messages: [messageSchema]
});

// Removing sender_details from payloadSchema as it's not present in the new JSON format
const payloadSchema = new mongoose.Schema({
  threads: [threadSchema]
});

const PayloadModel = mongoose.model('Payload', payloadSchema);

// Handle unique constraint error for messageID
PayloadModel.on('index', error => {
  if (error) {
    console.error('MongoDB Index Error:', error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern['messages.messageID']) {
      console.error('Duplicate messageID detected in a thread');
    }
  }
});

export default PayloadModel;

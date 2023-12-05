import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  messageID: { type: String, unique: true },
  title: String,
});

const threadSchema = new mongoose.Schema({
  threadID: { type: String, required: true },
  messages: [messageSchema],
});

const payloadSchema = new mongoose.Schema({
  sender_details: {
    email: String,
    deviceId: String,
  },
  threads: [threadSchema],
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

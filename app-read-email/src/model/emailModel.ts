import mongoose, {Document, Schema } from 'mongoose';

interface Attachment {
  fileName: string;
  mimeType: string;
  s3Url: string;
}

interface Headers {
  Subject?: string;
  deviceId?: string;
  From?: string;
  To?: string;
  'date-time'?: string;
}

interface Message {
  threadId: string;
  messageId: string;
  headers: Headers;
  body: string;
  attachments?: Attachment[];
}

interface Payload {
  messages: Message[];
}

interface PayloadDocument extends Payload, Document {}


// attachment schema
const attachmentSchema = new mongoose.Schema({
  fileName: String, // Name of the file
  mimeType: String, // MIME type of the file
  s3Url: String     // URL of the file stored in S3
});
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
  attachments: [attachmentSchema] // To store binary data 
});

const payloadSchema = new mongoose.Schema({
  messages: [messageSchema]
  
});

const PayloadModel = mongoose.model<PayloadDocument>('Payload', payloadSchema);


export default PayloadModel;

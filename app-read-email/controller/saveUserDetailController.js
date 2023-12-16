// controllers/saveUserDetailController.js
import PayloadModel from "../model/emailModel.js";
import { uploadToS3 } from '../utils/s3Upload.js'; // Utility for uploading to S3
import getFileExtension from "./fileTypeController.js";

// // Function to validate base64 data
// const isValidBase64 = (data) => {
//   const base64Regex = /^[A-Za-z0-9+/]+[=]{0,2}$/;
//   return base64Regex.test(data);
// };

export const saveUserDetails = async (req, res) => {
  try {
    const payloadData = req.body;

    console.log(JSON.stringify({payloadData}));

     // Iterate through each message
     for (const message of payloadData.messages) {
      const attachments = message.attachments || [];
      const attachmentUrls = [];

      // Process each attachment
      for (const attachment of attachments) {
        const buffer = Buffer.from(attachment.base64, 'base64');
        const fileName = `${message.messageId}.${getFileExtension(attachment.base64)}`; // Determine file extension
        const s3Url = await uploadAttachmentToS3(fileName, buffer);
        attachmentUrls.push({ fileName, mimeType: attachment.mimeType, s3Url });
      }

      // Update message with S3 URLs
      message.attachments = attachmentUrls;
    }

    // // Assuming the attachment field is named 'base64Attachments' in the payload
    // const base64Attachments = payloadData.messages.map(message => message.attachment);

    // // Decode base64 attachments
    // const binaryAttachments = base64Attachments.map(base64 => Buffer.from(base64, 'base64'));

    // // Update 'attachment' field in each message to store binary data
    // payloadData.messages.forEach((message, index) => {
    //   message.attachment = binaryAttachments[index];
    // });


    // Validate the payload
    if (!payloadData || !payloadData.messages || payloadData.messages.length === 0) {
      return res.status(400).json({ success: false, error: 'Invalid payload structure' });
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
// Function to upload attachment to S3
const uploadAttachmentToS3 = async (fileName, buffer) => {
  try {
    const s3Url = await uploadToS3(fileName, buffer);
    return s3Url;
  } catch (error) {
    console.error('Error uploading attachment to S3:', error);
    throw error;
  }
}
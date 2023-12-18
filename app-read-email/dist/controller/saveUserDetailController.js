// // controllers/saveUserDetailController.js
// import PayloadModel from "../model/emailModel.js";
// import { uploadToS3 } from '../utils/s3Upload.js'; // Utility for uploading to S3
// import getFileExtension from "./fileTypeController.js";
import PayloadModel from "../model/emailModel.js";
import { uploadToS3 } from '../utils/s3Upload.js'; // Utility for uploading to S3
import getFileExtension from "./fileTypeController.js";
export const saveUserDetails = async (req, res) => {
    try {
        // Extract the payload data from the request body
        const payloadData = req.body;
        console.log(JSON.stringify({ payloadData }));
        // Validate the payload
        if (!payloadData || !payloadData.messages || payloadData.messages.length === 0) {
            return res.status(400).json({ success: false, error: 'Invalid payload structure' });
        }
        // Iterate through each message
        for (const message of payloadData.messages) {
            const attachments = message.attachments || [];
            const attachmentUrls = [];
            // Process each attachment
            for (const attachment of attachments) {
                const buffer = Buffer.from(attachment.base64, 'base64');
                console.log('Attachment:', attachment);
                // Await the file extension using the provided utility function
                const fileExtension = await getFileExtension(attachment.base64);
                if (!fileExtension) {
                    console.error('Unable to determine file extension for attachment:', attachment);
                    continue; // Skip this attachment if the file extension can't be determined
                }
                // Create a file name based on the message ID and file extension
                const fileName = `${message.messageId}.${fileExtension}`;
                //const s3Url = await uploadToS3(fileName, buffer);
                // Upload the attachment to S3 and get the resulting URL
                const s3Url = await uploadToS3(attachment.base64, buffer, fileName);
                attachmentUrls.push({ fileName, mimeType: attachment.mimeType, s3Url });
            }
            // Update message with S3 URLs
            message.attachments = attachmentUrls;
        }
        // Save payload to MongoDB
        const savedPayload = await PayloadModel.create(payloadData);
        res.status(201).json({ success: true, data: savedPayload });
    }
    catch (error) {
        //duplicate key violation on messageID field
        if (error.code === 11000 && error.keyPattern && error.keyPattern['messages.messageId']) {
            res.status(400).json({ success: false, error: 'Duplicate messageID' });
        }
        else {
            console.error(error);
            res.status({ sucess: false, error: `Internal Server Error : ${error}` });
        }
    }
};

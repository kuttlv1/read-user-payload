import aws from 'aws-sdk';
//import getFileExtension from '../controller/fileTypeController.js';
import { accessKey, secretAccessKey } from '../config/pass.js';
// Configure AWS SDK with access key and secret access key
aws.config.update({
    accessKeyId: `${accessKey}`,
    secretAccessKey: `${secretAccessKey}`,
    //region: 'your-region',
});
// Create an S3 instance
const s3 = new aws.S3();
// Upload data to S3
export const uploadToS3 = async (base64Data, buffer, fileName) => {
    try {
        const params = {
            Bucket: 'email-msg-attachment',
            Key: fileName,
            Body: buffer,
            //ACL: 'public-read'
        };
        console.log('param-json is -', params);
        // Upload data to S3 and get the response
        const s3Response = await s3.upload(params).promise(); // Defines Structure of response when upload operation is Succeeds
        console.log('url is :', s3Response.Location);
        return s3Response.Location;
    }
    catch (error) {
        console.error('Error uploading to S3:', error);
        throw error;
    }
};

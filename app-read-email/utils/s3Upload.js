import aws from 'aws-sdk';
//import getFileExtension from '../controller/fileTypeController.js';
import { accessKey,secretAccessKey } from '../config/pass.js';

aws.config.update({
  accessKeyId: `${accessKey}`,
  secretAccessKey: `${secretAccessKey}`,
  //region: 'your-region',
});

const s3 = new aws.S3();

export const uploadToS3 = async (base64Data, buffer, fileName) => {
    try {
  
        const params = {
            Bucket: 'email-msg-attachment',
            Key: fileName,
            Body: buffer,
            //ACL: 'public-read'
        };
        console.log('param-json is -', params);
        const s3Response = await s3.upload(params).promise();
        console.log('url is :', s3Response.Location);
        return s3Response.Location;
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw error;
    }
};


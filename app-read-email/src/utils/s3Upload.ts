import aws , {S3} from 'aws-sdk';
//import getFileExtension from '../controller/fileTypeController.js';
import { accessKey,secretAccessKey } from '../config/pass.js';

// Configure AWS SDK with access key and secret access key
aws.config.update({
  accessKeyId: `${accessKey}`,
  secretAccessKey: `${secretAccessKey}`,
  //region: 'your-region',
});

// Create an S3 instance
const s3:S3 = new aws.S3();


// Upload data to S3

export const uploadToS3 = async (base64Data :string, buffer:Buffer, fileName:string): Promise<string> => {
    try {
        const chunkSize = 50 * 1024 * 1024; // 50MB chunks
        const params : S3.Types.PutObjectRequest = { // Defines the expected structure of the parameters that can be passed
            Bucket: 'email-msg-attachment',
            Key: fileName,
            Body: buffer,
            //ACL: 'public-read'
        };
        console.log('param-json is -', params);
        
//          // Upload data to S3 and get the response
//         const s3Response : S3.Types.ManagedUpload.SendData = await s3.upload(params).promise();  // Defines Structure of response when upload operation is Succeeds
        
//         console.log('url is :', s3Response.Location);

//         return s3Response.Location;
//     } catch (error) {
//         console.error('Error uploading to S3:', error);
//         throw error;
//     }
// };

const multipart = await s3.createMultipartUpload(params).promise();

    const numParts = Math.ceil(buffer.length / chunkSize);
    const uploadPromises: Promise<S3.Types.CompletedPart>[] = [];

    for (let i = 0; i < numParts; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, buffer.length);

      const partParams: S3.UploadPartRequest = {
        Bucket: 'email-msg-attachment',
        Key: fileName,
        PartNumber: i + 1,
        UploadId: multipart.UploadId!,
        Body: buffer.slice(start, end),
      };

      const uploadPartPromise = s3.uploadPart(partParams).promise();
      uploadPromises.push(uploadPartPromise);
    }

    const parts = await Promise.all(uploadPromises);

    const completeParams: S3.CompleteMultipartUploadRequest = {
      Bucket: 'email-msg-attachment',
      Key: fileName,
      UploadId: multipart.UploadId!,
      MultipartUpload: {
        Parts: parts.map((part, index) => ({ ETag: part.ETag, PartNumber: index + 1 })),
      },
    };

    await s3.completeMultipartUpload(completeParams).promise();

    const s3Url = `https://email-msg-attachment.s3.amazonaws.com/${fileName}`;
    return s3Url;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};


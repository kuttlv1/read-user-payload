import aws from 'aws-sdk';

const s3 = new aws.S3();

export const uploadToS3 = async (fileName, buffer) => {
  const params = {
    Bucket: 'email-msg-attachment',
    Key:fileName,
    Body: buffer
  };

  try {
    const s3Response = await s3.upload(params).promise();
    return s3Response.Location; // URL of the uploaded file
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};
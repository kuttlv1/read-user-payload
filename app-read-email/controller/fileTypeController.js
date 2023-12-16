import {fileTypeFromBuffer} from 'file-type';


async function getFileExtension(base64Data) {
  const buffer = Buffer.from(base64Data, 'base64');

  try {
    const type = await fileTypeFromBuffer(buffer);
    return type ? type.ext : null;
  } catch (error) {
    console.error('Error determining file type:', error);
    return null;
  }
}

export default getFileExtension;

// controller/fileTypeController.js
 import  {fileTypeFromBuffer}  from 'file-type';

async function getFileExtension(base64Data : string): Promise<string | null>{ 
  try {
    const buffer = Buffer.from(base64Data, 'base64');
    const type = await fileTypeFromBuffer(buffer);
    //return type.ext ? type.ext : null;
    return type.ext ?? null; //simplifies return statement 
  } catch (error) {
    console.error('Error determining file type:', error);
    return null;
  }
}

export default getFileExtension;





const { Storage } = require('@google-cloud/storage');
const path = require('path');
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

exports.uploadImages = async (files) => {

  if (!files || files.length === 0) {
    return []; // Return an empty array if no files were uploaded
  }
  const promises = files.map(file => {
    const blob = bucket.file(file.originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
      resumable: false
    });

    return new Promise((resolve, reject) => {
      blobStream.on('finish', () => {
        // Direct URL to the file
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      }).on('error', (error) => {
        console.error('Error uploading file to Google Cloud:', error);
        reject(error);
      }).end(file.buffer);
    });
  });

  return Promise.all(promises);
};

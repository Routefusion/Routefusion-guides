const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const token = process.env.RF_KEY
const ENDPOINT = 'https://sandbox.external.routefusion.com/graphql'; // Replace with your actual endpoint

async function uploadFile() {
  const form = new FormData();

  const operations = JSON.stringify({
    query: `
      mutation singleUpload($file: Upload!, $representative_id: UUID!) {
        singleUpload(
          file: $file, 
          representative_id: $representative_id,
          file_enum: front_drivers_license
        ) {
          filename
        }
      }
    `,
    variables: {
      file: null,
      representative_id: "603aaa34-d6dc-4c32-9a81-8788d7fee57c"
    }
  });

  form.append('operations', operations);

  const map = JSON.stringify({
    0: ['variables.file']
  });
  form.append('map', map);

  const filePath = path.join(__dirname, '../FakeFiles/fakeFile.txt'); // Ensure the file path is correct
  form.append('0', fs.createReadStream(filePath), 'fakeFile.txt');

  try {
    const response = await axios.post(ENDPOINT, form, {
      headers: {
        ...form.getHeaders(),
        'apollo-require-preflight': true,
        Authorization: `Bearer ${token}`
      }
    });

    console.log('File uploaded successfully:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
  }
}

uploadFile();

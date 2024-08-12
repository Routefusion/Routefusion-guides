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
      mutation singleUpload($file: Upload!, $entity_id: UUID!) {
        singleUpload(
          file: $file, 
          entity_id: $entity_id,
          file_enum: front_drivers_license
        ) {
          filename
        }
      }
    `,
    variables: {
      file: null,
      entity_id: "0c5f6e46-a0eb-4d8d-9498-df5a541c0548"
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

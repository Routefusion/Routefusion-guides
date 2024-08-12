const axios = require('axios');
const token = process.env.RF_KEY
let data = JSON.stringify({
  query: `mutation createRepresentative(
    $entity_id: UUID,
    $representative: RepresentativeInput
  ) {
    updateRepresentative(
      representative: $representative,
      id: $updateRepresentativeId
    ) {
      success
      message
    }
  }`,
  variables: {
    entity_id: "0c5f6e46-a0eb-4d8d-9498-df5a541c0548",
    representative: {
      cert_expiration_date: null,
      cert_issue_date: null,
      cert_no: null,
      citizenship: null,
      date_of_birth: null,
      email: null,
      first_name: null,
      is_signer: null,
      last_name: null,
      job_title: null,
      ownership_percentage: null,
      passport_number: null,
      phone: null,
      residential_address: null,
      residential_address2: null,
      residential_city: null,
      residential_country: null,
      residential_postal_code: null,
      residential_state_province_region: null,
      responsibility: null,
      tax_number: null
    },
    updateRepresentativeId
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://sandbox.external.routefusion.com/graphql',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data: data
};

axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch((error) => {
    console.error(error);
  });

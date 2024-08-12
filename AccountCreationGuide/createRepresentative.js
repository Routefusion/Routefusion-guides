const axios = require('axios');
const token = process.env.RF_KEY;

let data = JSON.stringify({
  query: `mutation createRepresentative (
    $entity_id: UUID
    $representative: RepresentativeInput
) {
    createRepresentative (
        entity_id: $entity_id
        representative: $representative
    )
}`,
  variables: {
    entity_id: "0c5f6e46-a0eb-4d8d-9498-df5a541c0548",
    representative: {
      document_expiration_date: '1990-09-26T00:00:00Z',
      document_issue_date: '2020-10-28T00:00:00Z',
      document_number: '9078092879078320978',
      citizenship: "USA",
      date_of_birth: "1990-09-26T00:00:00Z",
      email: 'meow@meow.com',
      first_name: "John",
      is_signer: true,
      last_name: "Smith",
      job_title: "CEO",
      ownership_percentage: 100,
      passport_number: null,
      phone: '2813308004',
      residential_address: '1305 e 6th street',
      residential_address2: null,
      residential_city: "Austin",
      residential_country: "USA",
      residential_postal_code: '78733',
      residential_state_province_region: "TX",
      responsibility: "UBO",  // Added responsibility
      tax_number: '12123222'
    }
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
    console.error(error.response ? error.response.data : error.message);
  });

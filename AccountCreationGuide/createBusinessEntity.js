const axios = require('axios');
const token = process.env.RF_KEY
let data = JSON.stringify({
  query: `mutation createBusinessEntity (
    $user_id: UUID!
    $email: Email!
    $phone: String
    $contact_first_name: String!
    $contact_last_name: String!
    $business_name: String!
    $business_address1: String!
    $business_address2: String
    $business_city: String
    $business_state_province_region: String
    $business_postal_code: PostalCode
    $business_country: ISO3166_1!
    $tax_number: TaxNumber
    $officers: [OfficerInput]
    $accept_terms_and_conditions: Boolean!
) {
    createBusinessEntity (
        user_id: $user_id
        email: $email
        phone: $phone
        contact_first_name: $contact_first_name
        contact_last_name: $contact_last_name
        business_name: $business_name
        business_address1: $business_address1
        business_address2: $business_address2
        business_city: $business_city
        business_state_province_region: $business_state_province_region
        business_postal_code: $business_postal_code
        business_country: $business_country
        tax_number: $tax_number
        officers: $officers
        accept_terms_and_conditions: $accept_terms_and_conditions
    )
}`,
  variables: {
    user_id: "6064fdd7-97a2-47e3-a5c3-bae71ca5f28e",
    email: "john@meowmeowmeow.com",
    phone: "2813308004",
    contact_first_name: "John",
    contact_last_name: "Smith",
    business_name: "Smith Yo Face",
    business_address1: "111 GTFO Ave",
    business_address2: "",
    business_city: "Austin",
    business_state_province_region: "TX",
    business_postal_code: "78702",
    business_country: "USA",
    tax_number: "12-3456789",
    officers: [{
      first_name: "Colton",
      last_name: "Seal",
      percent_ownership: 100,
      director: true,
      occupation: "CEO",
      birth_date: "1990-09-26T00:00:00Z"
    }],
    accept_terms_and_conditions: true
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
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error.response.data);
});
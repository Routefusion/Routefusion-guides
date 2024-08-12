const axios = require('axios');
const token = process.env.RF_KEY
let data = JSON.stringify({
  query: `query entityRequiredFields (
    $country: ISO3166_1
    $entity_type: EntityType
    $business_type: BusinessType
) {
    entityRequiredFields (
        country: $country
        entity_type: $entity_type
        business_type: $business_type
    ) {
        requires_representatives
        documents {
            enum
            type
        }
        fields {
            variable
            regex
            example
            enum
        }
    }
}`,
  variables: {"country":"US","entity_type":"business","business_type":"sole_proprietorship"}
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
  console.log(JSON.stringify(response.data, null, 2));
})
.catch((error) => {
  console.log(error);
});
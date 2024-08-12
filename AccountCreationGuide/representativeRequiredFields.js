const axios = require('axios');
const token = process.env.RF_KEY;
let data = JSON.stringify({
  query: `query representativeRequiredFields (
    $country: ISO3166_1
) {
    representativeRequiredFields (  
        country: $country
    ) {
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
  variables: {"country":"US"}
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
});x3
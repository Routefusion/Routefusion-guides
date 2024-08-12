var axios = require('axios');
const token = process.env.RF_KEY;
var data = JSON.stringify({
  query: `mutation ($entity_id: UUID!, $currency: ISO4217!) {
    createWallet (entity_id: $entity_id, currency: $currency)
  }`,
  variables: {"entity_id":"0c5f6e46-a0eb-4d8d-9498-df5a541c0548", "currency": "USD"}
});

var config = {
  method: 'post',
  url: 'https://sandbox.external.routefusion.com/graphql',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error.response.data);
});
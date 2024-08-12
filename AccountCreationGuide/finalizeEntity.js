const token = process.env.RF_KEY;
const axios = require('axios');

let data = JSON.stringify({
  query: `mutation finalizeEntity (
    $entity_id: UUID
) {
    finalizeEntity (
        entity_id: $entity_id
    ) {
        success
        error
    }
}`,
  variables: {"entity_id":"0c5f6e46-a0eb-4d8d-9498-df5a541c0548"}
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
  console.log(error);
});

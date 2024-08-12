const axios = require('axios');
const token = process.env.RF_KEY
let data = JSON.stringify({
  query: `query myUser {
    myUser {
        id
        identifier
        email
        first_name
        last_name
        admin
        organization {
            id
            identifier
            admin
            restricted
            enabled
        }
    }
}`,
  variables: {}
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://sandbox.external.routefusion.com/graphql',
  headers: {
    'Authorization': `Bearer ${token}`, 
    'Content-Type': 'application/json'
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


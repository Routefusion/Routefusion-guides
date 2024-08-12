var axios = require('axios');
var token = process.env.RF_KEY
var data = JSON.stringify({
  query: `query organizationEntities (
    $search_terms: String
    $listFilter: ListFilter
) {
    organizationEntities (
        search_terms: $search_terms
        listFilter: $listFilter
    ) {
        id
        type
        business_name
        first_name
        last_name
        state
        email
        phone
        address1
        address2
        city
        state_province_region
        postal_code
        country
        creator {
            id
            identifier
            email
            first_name
            last_name
            admin
        }
        users {
            id
            identifier
            email
            first_name
            last_name
            admin
        }
    }
}`,
  variables: {"search_terms":"","listFilter":{"limit":0,"offset":0}}
});

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://sandbox.external.routefusion.com/graphql',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

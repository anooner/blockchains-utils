var axios = require('axios');
var data = JSON.stringify({
  query: `query {
	version
}`,
  variables: {}
});

var config = {
  method: 'post',
  url: 'http://localhost:3085/graphql',
  headers: { 
    'Content-Type': 'application/json'
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
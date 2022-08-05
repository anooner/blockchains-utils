var axios = require('axios');
var data = JSON.stringify({
  query: `query {
	account(publicKey: $pubkey) {
	  publicKey
    token
    nonce 
    balance {
      total
      blockHeight
    }
    locked
    isDisabled
  }
}`,
  variables: {"pubkey": "B62qmx9636v4hrzH1V2HdmPHhf2PRxVtct33YzfgbR24WyuM7FcjTVK"}
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
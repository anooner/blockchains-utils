var axios = require('axios');
var data = JSON.stringify({
  query: `mutation {
	sendPayment(signature: $sig, input: $inputs) {
        payment {
            id
            hash
            nonce
            fee
            memo
        }
    }
}`,
  variables: {"sig": {
      "rawSignature": null,
      "field": "15528303052703663206221737700560388556994051907029296405091912810024822176628",
      "scalar": "11381269000459591549111512030455117148659820168906330496888773366046686867237",
  },
  "inputs": {
    "to": "B62qkmERmFmyC4DkCHBerxkeEJUCty8oh5V6qyUDskjCuXokkiKEykF",
    "from": "B62qkzckNbGJznFFQ6ure2K7UDmvkpJHXHZH9gkoVrZGv7j9xp6DjxV",
    "fee": "12345678",
    "amount": "10000000",
    "nonce": "2",
    "memo": "",
    "validUntil": "4294967295"
  }
}
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
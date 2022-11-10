const nearAPI = require("near-api-js");
const BN = require('bn.js');

(async () => {
    const re = nearAPI.validators.findSeatPrice(
        [{stake: '1000000'}, {stake: '1000000'}, {stake: '100'}], 2, [1, 6250], 49)

    console.log(re)
})()


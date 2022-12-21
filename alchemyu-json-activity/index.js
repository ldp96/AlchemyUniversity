const axios = require('axios');

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL = "https://eth-goerli.g.alchemy.com/v2/19elM3YBAecg-Lg4AlL6rb1nU7uwRuqh";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBalance",
  params: [
    "0x28E0E8d05a4c133a8B22210634Cd2CfA012d1b15", // block 46147
    //false  // retrieve the full transaction object in transactions array
  ]
}).then((response) => {
  console.log(response.data.result);
});
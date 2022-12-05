const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // take parameter from command line and join words
  const nameArr = process.argv.slice(2);
  let name = "";
  for (let i=0; i<nameArr.length;i++){
    name = name + " " + nameArr[i];
  }
  name = name.trimLeft();
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
  });

  console.log({ gift });
}

main();
const ethers = require('ethers');
require('dotenv').config();

async function main() {

  const url = process.env.GOERLI_URL;

  let artifacts = await hre.artifacts.readArtifact("Winner");

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let contract = await factory.deploy();

  console.log("Contract address:", contract.address);

  await contract.deployed(); //0xC1c358399d781D93D543678C673743eEd69F6E7e

  await contract.win("0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes,toHex,hexToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

app.use(cors());
app.use(express.json());

const balances = {
  "932769c871c5469d71eeddc25382b79aaae2f168": 100,
  "cecc2ff68ce92ebb1a87f36ac6bfb5182542716d": 50,
  "0c52aef9c86e50ff4602b52d8ea22a71a85f635e": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, sign, recoveryBit} = req.body;
  const message = {sender, amount,recipient};
  const messageHash = hashMessage(JSON.stringify(message));
  const recovered = secp.recoverPublicKey(messageHash, hexToBytes(sign), recoveryBit);

  const addressOfSign = toHex(addressFromPublicKey(recovered));
  console.log('addressOfSign:',addressOfSign)

  setInitialBalance(sender);
  setInitialBalance(recipient);
  if(sender!==addressOfSign){
    res.status(400).send({ message: "You're not allowed to move this funds" });
  }else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  return keccak256(bytes);
}
function addressFromPublicKey(publicKey){
  const addrBytes = publicKey.slice(1);
  const hash = keccak256(addrBytes);
  return hash.slice(-20);
}

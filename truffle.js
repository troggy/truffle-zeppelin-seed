require('dotenv').config();

const PrivateKeyProvider = require("truffle-privatekey-provider");

const networks = ["rinkeby", "kovan", "ropsten", "mainnet"];

const infuraNetworks = networks
  .map((network) => {
    const envVarName = `${network.toUpperCase()}_PRIVATE_KEY`
    const privateKeyHex = process.env[envVarName];

    if (privateKeyHex) {
      var provider = new PrivateKeyProvider(privateKeyHex, `https://${network}.infura.io/`);

      return [network, {
          network_id: "*",
          gas: 4612388,
          provider
      }];
    }
  })
  .filter(n => !!n)
  .reduce((acc, n) => {
    acc[n[0]] = n[1];
    return acc;
  }, {});

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    ...infuraNetworks,
  }
};

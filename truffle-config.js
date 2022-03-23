var HDWalletProvider = require("@truffle/hdwallet-provider");
const { PrivateKey, walletAccount, ropstenInfuraApi } = require("./config");
const MNEMONIC = PrivateKey;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, ropstenInfuraApi);
      },
      network_id: 3,
      gas: 4000000,
      from: walletAccount, //make sure this gas allocation isn't over 4M, which is the max
    },
  },
};

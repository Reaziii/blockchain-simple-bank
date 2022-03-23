var UPAY = artifacts.require("./UPAY.sol");

module.exports = function(deployer) {
	deployer.deploy(UPAY);
};
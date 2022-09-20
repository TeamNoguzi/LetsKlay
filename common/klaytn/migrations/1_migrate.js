var FactoryContract = artifacts.require("factory");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(FactoryContract);
};

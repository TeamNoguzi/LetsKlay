var MyContract = artifacts.require("funding");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(
    MyContract,
    ["0x05416460deb76d57af601be17e777b93592d8d4d4a4096c57876a91c84f4a712"],
    [1],
    100
  );
};

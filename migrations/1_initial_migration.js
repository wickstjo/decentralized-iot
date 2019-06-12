module.exports = function(deployer) {
  deployer.deploy(
    artifacts.require("./contracts/Migrations.sol")
  )
};
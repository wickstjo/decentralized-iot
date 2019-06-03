var Main = artifacts.require("./contracts/Main.sol");
var Users = artifacts.require("./contracts/Users.sol");
var Devices = artifacts.require("./contracts/Devices.sol");

module.exports = function(deployer) {
   deployer.deploy(Main);
   deployer.deploy(Users);
   deployer.deploy(Devices);
};
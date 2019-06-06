var Devices = artifacts.require("./contracts/Devices.sol");
var Licences = artifacts.require("./contracts/Licences.sol");
var Tasks = artifacts.require("./contracts/Tasks.sol");
var Tokens = artifacts.require("./contracts/Tokens.sol");
var Users = artifacts.require("./contracts/Users.sol");

module.exports = function(deployer) {
   deployer.deploy(Devices);
   deployer.deploy(Licences);
   deployer.deploy(Tasks);
   deployer.deploy(Tokens);
   deployer.deploy(Users);
};
var Devices = artifacts.require("./contracts/Devices.sol");
var Licences = artifacts.require("./contracts/Licences.sol");
var Tasks = artifacts.require("./contracts/Tasks.sol");
var Token = artifacts.require("./contracts/Token.sol");
var Users = artifacts.require("./contracts/Users.sol");

module.exports = function(deployer) {
   deployer.deploy(Devices);
   deployer.deploy(Licences);
   deployer.deploy(Tasks);
   deployer.deploy(Token);
   deployer.deploy(Users);
};
pragma solidity ^0.5.0;

// IMPORT DEVICE CONTRACT
import { Device } from './Device.sol';

contract Devices {

   // HASHMAP OF DEVICES
   mapping (string => Device) devices;

   // CHECK THAT DEVICE EXISTS
   modifier isDevice(string memory id) {
      require(exists(id), 'device does not exist');
      _;
   }

   // CHECK IF SENDER IS OWNER
   modifier isOwner(string memory id) {
      require(msg.sender == devices[id].owner(), 'you are not the owner');
      _;
   }

   // FETCH DEVICE ENTRY
   function fetch(string memory id) public view isOwner(id) returns(Device) {
      return devices[id];
   }

   // CREATE NEW DEVICE INSTANCE
   function add(string memory id, string memory name, address payable owner) public isDevice(id) isOwner(id) {
      devices[id] = new Device(name, owner);
   }

   // REMOVE DEVICE INSTANCE
   function remove(string memory id) public isDevice(id) isOwner(id) {
      delete devices[id];
   }

   // CHECK IF DEVICE EXISTS
   function exists(string memory id) internal view returns(bool) {

      // DEFAULT TO FALSE
      bool response = false;

      // IF DEVICE EXISTS, SWAP TO TRUE
      if (devices[id].isset()) {
         response = true;
      }

      return response;
   }
}
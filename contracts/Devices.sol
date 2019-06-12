pragma solidity ^0.5.0;

// IMPORT DEVICE CONTRACT
import { Device } from './Device.sol';

interface Assistant {

   // CHECK IF SENDER IS OWNER
   modifier isOwner(Device device) {
      require(msg.sender == device.owner(), 'you are not the owner');
      _;
   }

   // CHECK IF DEVICE EXISTS
   modifier isDevice(Device device) {
      require(device.isset(), 'device does not exist');
      _;
   }

   // CHECK IF DEVICE DOES NOT EXISTS
   modifier isNotDevice(Device device) {
      require(!device.isset(), 'device already exist');
      _;
   }
}

contract Devices is Assistant {

   // HASHMAP OF DEVICES
   mapping (string => Device) devices;

   // FETCH DEVICE ENTRY
   function fetch(string memory id) public view isOwner(devices[id]) returns(Device) {
      return devices[id];
   }

   // CREATE NEW DEVICE INSTANCE
   function add(string memory id, string memory name, address payable owner) public isNotDevice(devices[id]) {
      devices[id] = new Device(name, owner);
   }

   // REMOVE DEVICE INSTANCE
   function remove(string memory id) public isDevice(devices[id]) isOwner(devices[id]) {
      delete devices[id];
   }
}
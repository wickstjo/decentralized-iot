pragma solidity ^0.5.0;

contract Devices {

   // MAP OF DEVICES
   mapping (string => address) devices;

   // FETCH DEVICE ENTRY
   function fetch(string memory id) public view returns(address) {

      // MAKE SURE DEVICE EXISTS
      require(exists(id), 'device does not exist');

      // RETURN ENTRY
      return devices[id];
   }

   // CHECK IF DEVICE EXISTS
   function exists(string memory id) public view returns(bool) {

      // DEFAULT TO FALSE
      bool response = false;

      // IF DEVICE EXISTS, SWAP TO TRUE
      if (devices[id] != 0x0000000000000000000000000000000000000000) {
         response = true;
      }

      return response;
   }
}

contract Device {

   // VARS
   string public name;

   // CONSTRUCTOR
   constructor(string memory _name) public {

      // SET NAME
      name = _name;
   }
}
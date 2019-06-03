pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Devices {

   // MAP OF USER OWNED DEVICES
   mapping (address => Device[]) devices;

   // DEVICE STRUCT
   struct Device {
      string name;
      string id;
   }

   // ADD/UPDATE DEVICE
   function add(address _owner, string memory _name, string memory _id) public {
      devices[_owner].push(Device({
         name: _name,
         id: _id
      }));
   }

   // DELETE DEVICE
   function remove(address _owner, uint id) public {
      delete devices[_owner][id];
   }

   // FETCH SPECIFIC DEVICE
   function specific(address _owner, uint id) public view returns(Device memory) {
      return devices[_owner][id];
   }

   // FETCH ALL USER OWNED DEVICES
   function all(address _owner) public view returns(Device[] memory) {
      return devices[_owner];
   }
}
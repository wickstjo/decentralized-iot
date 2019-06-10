pragma solidity ^0.5.0;

contract Devices {

   // MAP OF DEVICES
   mapping (string => Device) devices;

   // FETCH DEVICE ENTRY
   function fetch(string memory id) public view returns(Device) {

      // MAKE SURE DEVICE EXISTS
      require(exists(id), 'device does not exist');

      // RETURN ENTRY
      return devices[id];
   }

   // ADD FUNC
   function add(string memory id, string memory name, address payable owner) public {

      // MAKE SURE DEVICE DOESNT ALREADY EXISTS
      require(!exists(id), 'device already exists');

      // CREATE NEW DEVICE INSTANCE
      devices[id] = new Device(name, owner);
   }

   // REMOVE FUNC
   function remove(string memory id) public {

      // CHECK EXISTENCE & THAT SENDER IS THE OWNER
      require(exists(id), 'device does not exist');
      require(msg.sender == devices[id].owner(), 'you are not the owner');

      // REMOVE THE ENTRY
      delete devices[id];
   }

   // CHECK IF DEVICE EXISTS
   function exists(string memory id) public view returns(bool) {

      // DEFAULT TO FALSE
      bool response = false;

      // IF DEVICE EXISTS, SWAP TO TRUE
      if (devices[id].isset()) {
         response = true;
      }

      return response;
   }
}

contract Device {

   // REF VARS
   string public name;
   address payable public owner;

   // HELPERS
   bool public status;
   bool public isset;

   // CONSTRUCTOR
   constructor(string memory _name, address payable _owner) public {

      // SET REFERENCES
      name = _name;
      owner = _owner;

      // SET BOOLS
      status = true;
      isset = true;
   }

   // TOGGLE CONTRACT STATUS
   function toggle() public {

      // MAKE SURE SENDER IS OWNER
      require(msg.sender == owner, 'you are not the owner');

      // TOGGLE STATUS
      status = !status;
   }

   // DESTROY THE CONTRACT
   function nuke() public {

      // MAKE SURE SENDER IS OWNER
      require(msg.sender == owner, 'you are not the owner');

      // DESTROY THE CONTRACT & SEND ETH BACK
      selfdestruct(owner);
   }
}
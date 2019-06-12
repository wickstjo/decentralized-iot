pragma solidity ^0.5.0;

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

   // CHECK IF SENDER IS OWNER
   modifier isOwner {
      require(msg.sender == owner, 'you are not the owner');
      _;
   }

   // TOGGLE CONTRACT STATUS
   function toggle() public isOwner {
      status = !status;
   }

   // DESTROY THE CONTRACT & SEND ETH BACK
   function nuke() public isOwner {
      selfdestruct(owner);
   }
}
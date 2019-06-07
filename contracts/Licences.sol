pragma solidity ^0.5.0;

contract Licences {

   // PRICE IN WEI
   uint public price = 1000000;

   // DURATION IN SECONDS
   uint public duration = 604800;

   // MAP OF LICENCES, USER => EXPIRATION DATE
   mapping (address => uint256) licences;

   // PURCHASE LICENCE
   function add(uint amount) public payable {

      // MAKE SURE PAYED FUNDS ARE WITHIN RANGE
      require(msg.value >= amount * price, 'not enough funds');

      // FIGURE OUT PURCHASED TIME
      uint time = amount * duration;

      // IF USER HAS VALID LICENCE ALREADY
      if (valid(msg.sender)) {

         // ADD TO EXISTING VALUE
         licences[msg.sender] += time;

      // OTHERWISE
      } else {

         // ADD DURATION BASED ON BLOCK TIMESTAMP
         licences[msg.sender] = block.timestamp + time;
      }
   }

   // REMOVE LICENCE
   function remove() public {

      // MAKE SURE THE USER EXISTS
      require(exists(msg.sender), 'user does not exist');

      // REMOVE ENTRY
      delete licences[msg.sender];
   }

   // CHECK IF USER EXISTS
   function exists(address user) public view returns(bool) {

      // DEFAULT TO TRUE
      bool response = true;

      // IF IT HASNT BEEN DECLARED, SWAP TO FALSE
      if (licences[user] == 0) {
         response = false;
      }

      return response;
   }

   // CHECK FOR LICENCE VALIDITY
   function valid(address user) public view returns(bool) {

      // DEFAULT TO FALSE
      bool response = false;

      // IF THE VALUE IS HIGHER THAN THE CURRENT TIMESTAMP, SWAP TO TRUE
      if (block.timestamp < licences[user]) {
         response = true;
      }

      return response;
   }

   // FETCH USER LICENCE DATA
   function fetch() public view returns(uint256) {

      // MAKE SURE THE USER EXISTS
      require(exists(msg.sender), 'user does not exist');

      // RETURN VALUE
      return licences[msg.sender];
   }
}
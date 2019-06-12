pragma solidity ^0.5.0;

contract Licences {

   // PRICE (WEI) & DURATION (SECONDS)
   uint public price = 1000000;
   uint public duration = 604800;

   // OWNER ADDRESS => EXPIRATION TIMESTAMP
   mapping (address => uint256) licences;

   // CHECK IF FUNDS ARE ENOUGH
   modifier canAfford(uint amount) {
      require(msg.value >= amount * price, 'not enough funds');
      _;
   }

   // CHECK IF SENDER IS A USER
   modifier isUser {
      require(exists(msg.sender), 'user does not exist');
      _;
   }

   // PURCHASE LICENCE
   function add(uint amount) public payable canAfford(amount) {

      // FIGURE OUT PURCHASED TIME
      uint time = amount * duration;

      // IF SENDER ALREADY HAS A LICENCE, ADD TO TIME
      if (hasLicence(msg.sender)) {
         licences[msg.sender] += time;

      // OTHERWISE, ADD TO CURRENT TIMESTAMP
      } else {
         licences[msg.sender] = block.timestamp + time;
      }
   }

   // REMOVE LICENCE ENTRY
   function remove() public isUser {
      delete licences[msg.sender];
   }

   // FETCH USER LICENCE DATA
   function fetch(address user) public view isUser returns(uint256) {
      return licences[user];
   }

   // CHECK IF USER EXISTS
   function exists(address user) internal view returns(bool) {

      // DEFAULT TO TRUE
      bool response = true;

      // IF IT HASNT BEEN DECLARED, SWAP TO FALSE
      if (licences[user] == 0) {
         response = false;
      }

      return response;
   }

   // CHECK IS USER HAS A LICENCE
   function hasLicence(address user) internal view returns(bool) {

      // DEFAULT TO FALSE
      bool response = false;

      // IF THE VALUE IS HIGHER THAN THE CURRENT TIMESTAMP, SWAP TO TRUE
      if (block.timestamp < licences[user]) {
         response = true;
      }

      return response;
   }
}
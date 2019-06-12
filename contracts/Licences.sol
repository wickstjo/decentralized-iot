pragma solidity ^0.5.0;

interface Assistant {

   // CHECK IF FUNDS ARE ENOUGH
   modifier canAfford(uint amount, uint price) {
      require(msg.value >= amount * price, 'not enough funds');
      _;
   }

   // CHECK IF SENDER IS A USER
   modifier isUser(mapping (address => uint256) memory licences) {
      require(licences[msg.sender] != 0, 'user does not exists');
      _;
   }

   // CHECK IF SENDER IS A not USER
   modifier isNotUser(mapping (address => uint256) memory licences) {
      require(licences[msg.sender] == 0, 'user already exists');
      _;
   }
}

contract Licences is Assistant {

   // PRICE (WEI) & DURATION (SECONDS)
   uint public price = 1000000;
   uint public duration = 604800;

   // OWNER ADDRESS => EXPIRATION TIMESTAMP
   mapping (address => uint256) licences;

   // PURCHASE LICENCE
   function add(uint amount) public payable canAfford(amount, price) isNotUser(licences) {

      // FIGURE OUT PURCHASED TIME
      uint time = amount * duration;

      // IF SENDER ALREADY HAS A LICENCE, ADD TO TIME
      if (block.timestamp < licences[msg.sender]) {
         licences[msg.sender] += time;

      // OTHERWISE, ADD TO CURRENT TIMESTAMP
      } else {
         licences[msg.sender] = block.timestamp + time;
      }
   }

   // REMOVE LICENCE ENTRY
   function remove() public isUser(licences) {
      delete licences[msg.sender];
   }

   // FETCH USER LICENCE DATA
   function fetch(address user) public view isUser(licences) returns(uint256) {
      return licences[user];
   }
}
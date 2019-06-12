pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Users {

   // USER OBJECT
   struct User {
      string name;
      uint reputation;
      uint256 joined;
      bool isset;
   }

   // OWNER ADDRESS => USER OBJECT
   mapping (address => User) users;

   // CHECK IF USER DOESNT EXIST
   modifier isNotUser {
      require(!exists(msg.sender), 'user already exists');
      _;
   }

   // CHECK IF USER EXISTS
   modifier isUser {
      require(exists(msg.sender), 'user does not exists');
      _;
   }

   // CHECK THAT GIVEN AMOUNT IS NOT NEGATIVE
   modifier notNegative(uint amount) {
      require(amount >= 1, 'amount cannot be negative');
      _;
   }

   // ADD ENTRY TO HASHMAP
   function add(string memory _name) public isNotUser {
      users[msg.sender] = User({
         name: _name,
         reputation: 0,
         joined: block.timestamp,
         isset: true
      });
   }

   // REMOVE ENTRY FROM HASHMAP
   function remove() public isUser {
      delete users[msg.sender];
   }

   // REWARD REPUTATION TO USER
   function reward(address user, uint amount) public isUser notNegative(amount) {
      users[user].reputation += amount;
   }

   // FETCH USER DATA
   function fetch(address user) public view isUser returns(User memory) {
      return users[user];
   }

   // CHECK IF USER EXISTS
   function exists(address user) public view returns(bool) {

      // DEFAULT TO FALSE
      bool response = false;

      // IF THE ADDRESS HAS BEEN DEFINED, SWAP TO TRUE
      if (users[user].isset) {
         response = true;
      }

      return response;
   }
}
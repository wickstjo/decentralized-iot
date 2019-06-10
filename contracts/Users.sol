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

   // MAP OF USERS
   mapping (address => User) users;

   // ADD USER
   function add(string memory _name) public {

      // MAKE SURE THE USER DOESNT EXIST
      require(!exists(msg.sender), 'user already exists');

      // ADD ENTRY
      users[msg.sender] = User({
         name: _name,
         reputation: 0,
         joined: block.timestamp,
         isset: true
      });
   }

   // REMOVE USER
   function remove() public {

      // MAKE SURE THE USER DOESNT EXIST
      require(exists(msg.sender), 'user does not exists');

      // DELETE ENTRY
      delete users[msg.sender];
   }

   // REWARD REPUTATION TO USER
   function reward(address user, uint amount) public {

      // MAKE SURE THE USER DOESNT EXIST
      require(exists(user), 'user does not exists');

      // MAKE SURE AMOUNT ISNT NEGATIVE
      require(amount >= 1, 'amount cannot be negative');

      // INCREMENT REPUTATION
      users[user].reputation += amount;
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

   // FETCH USER LICENCE DATA
   function fetch(address user) public view returns(User memory) {

      // MAKE SURE THE USER EXISTS
      require(exists(user), 'user does not exist');

      // RETURN VALUE
      return users[user];
   }
}
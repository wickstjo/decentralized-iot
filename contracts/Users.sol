pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Users {

   // MAP OF USERS
   mapping (address => User) users;

   string public foob = 'testing';

   // USER STRUCT
   struct User {
      string name;
   }

   // ADD/UPDATE USER
   function set(address _owner, string memory _name) public {

      // PUSH NEW USER OBJECT TO ARRAY
      users[_owner] = User({
         name: _name
      });
   }

   // DELETE USER
   function remove(address _user) public {
      delete users[_user];
   }

   // FETCH USER
   function fetch(address _user) public view returns(User memory) {
      return users[_user];
   }
}
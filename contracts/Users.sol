pragma solidity ^0.5.0;

// IMPORT USER INTERFACE
import { User } from './User.sol';

contract Users {

    // USER & TOKEN MAPS
    mapping (address => User) public users;

    // CHECK IF USER EXISTS
    function exists(address user) public view returns(bool) {
        if (address(users[user]) != 0x0000000000000000000000000000000000000000) {
            return users[user].isset();
        }

        return false;
    }

    // FETCH USER CONTRACT ADDRESS
    function fetch(address user) public view returns(User) {

        // CONDITION
        require(exists(user), 'user does not exist');

        // FETCH DETAILS
        return users[user];
    }

    // FETCH USER DETAILS
    function details(address user) public view returns(string memory, uint256, uint) {

        // CONDITION
        require(exists(user), 'user does not exist');

        return users[user].fetch();
    }

    // ADD ENTRY TO HASHMAP
    function add(string memory name) public {

        // CONDITIONS
        require(!exists(msg.sender), 'user already exists');

        // PUSH NEW USER
        users[msg.sender] = new User(name, block.timestamp);
    }
}
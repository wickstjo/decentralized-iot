pragma solidity ^0.5.0;

// IMPORT USER INTERFACE
import { User } from './User.sol';

contract Users {

    // USER & TOKEN MAPS
    mapping (address => User) public users;
    address[] public all;

    // USER ADDED EVENT
    event Update(address[] users);

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

        return users[user].details();
    }

    // ADD ENTRY TO HASHMAP
    function add(string memory name) public {

        // CONDITION
        require(!exists(msg.sender), 'user already exists');

        // PUSH IT TO BOTH CONTAINERS
        users[msg.sender] = new User(name, block.timestamp);
        all.push(msg.sender);

        // EMIT EVENT
        emit Update(all);
    }

    // FETCH OWNER DEVICE COLLECTION
    function collection() public view returns(address[] memory) {
        return all;
    }
}
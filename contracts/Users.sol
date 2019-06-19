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
    mapping (address => User) public users;

    // ADD ENTRY TO HASHMAP
    function add(string memory _name) public {

        // CONDITIONS
        require(users[msg.sender].isset != true, 'user already exists');

        // PUSH NEW USER
        users[msg.sender] = User({
            name: _name,
            reputation: 0,
            joined: block.timestamp,
            isset: true
        });
    }

    // REMOVE ENTRY FROM HASHMAP
    function remove() public {

        // IF THE USER EXISTS, REMOVE ENTRY
        require(users[msg.sender].isset, 'user does not exist');
        delete users[msg.sender];
    }

    // FETCH USER DATA
    function fetch(address user) public view returns(User memory) {
        return users[user];
    }

    // REWARD REPUTATION TO USER
    function reward(address receiver, uint amount) public {

        // CONDITIONS
        require(users[msg.sender].isset, 'sender does not exist');
        require(users[receiver].isset, 'receiver does not exist');
        require(amount >= 1, 'amount cannot be negative');

        // ADD REPUTATION TO RECEIVER
        users[receiver].reputation += amount;
    }
}
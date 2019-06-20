pragma solidity ^0.5.0;

contract Licences {

    // PRICE (WEI) & DURATION (SECONDS)
    uint public price = 1000000;
    uint public duration = 604800;

    // OWNER ADDRESS => EXPIRATION TIMESTAMP
    mapping (address => uint256) licences;

    // PURCHASE LICENCE
    function add(uint amount) public payable {

        // CONDITIONS
        require(msg.value >= amount * price, 'not enough funds');

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
    function remove() public {

        // IF THE USER EXISTS, REMOVE ENTRY
        require(licences[msg.sender] != 0, 'user does not exists');
        delete licences[msg.sender];
    }

    // FETCH USER LICENCE DATA
    function fetch(address user) public view returns(uint256) {
        return licences[user];
    }
}
pragma solidity ^0.5.0;

contract Token {

    // TOKEN OWNERSHIP MAP
    mapping (address => uint) public tokens;

    // HELPER PARAMS
    uint public price;
    address public tasks;
    bool public initialized = false;

    // INITIALIZE PARAMS
    function init(uint _price, address _tasks) public {

        // CONDITION
        require(!initialized, 'contract has already been initialized');

        // SET PARAMS
        price = _price;
        tasks = _tasks;
        initialized = true;
    }

    // CHECK USER TOKEN AMOUNT
    function check(address user) public view returns(uint) {
        return tokens[user];
    }

    // ADD TOKEN
    function add(uint amount) public payable {

        // CONDITIONS
        require(initialized, 'contract has not been initialized');
        require(msg.value == amount * price, 'insufficient funds');

        // INCREASE TOKEN COUNT FOR SENDER
        tokens[msg.sender] += amount;
    }

    // REMOVE TOKEN
    function remove(uint amount, address user) public {

        // CONDITIONS
        require(initialized, 'contract has not been initialized');
        require(msg.sender == tasks, 'bad caller');
        require(tokens[user] >= amount, 'user token count exceeded');

        // DECREASE TOKEN COUNT FOR USER
        tokens[user] -= amount;
    }

    // TRANSFER TOKENS FROM SENDER TO USER
    function transfer(uint amount, address user) public {

        // CONDITIONS
        require(initialized, 'contract has not been initialized');
        require(tokens[msg.sender] >= amount, 'you dont have that amount of tokens');

        // REDUCE TOKENS FROM SENDER, INCREASE THEM FOR USER
        tokens[msg.sender] -= amount;
        tokens[user] += amount;
    }
}
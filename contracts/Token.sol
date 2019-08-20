pragma solidity ^0.5.0;

contract Token {

    // TOKEN OWNERSHIP & PRICE
    mapping (address => uint) public tokens;
    uint public Price;

    // INIT STATUS & TASKS ADDRESS
    bool public initialized = false;
    address public tasks;

    // TOKEN AMOUNT CHANGED EVENT
    event Update(
        address user,
        uint amount
    );

    // INITIALIZE PARAMS
    function init(uint _price, address _tasks) public {

        // CONDITION
        require(!initialized, 'contract has already been initialized');

        // SET PARAMS
        Price = _price;
        tasks = _tasks;
        initialized = true;
    }

    // FETCH TOKEN PRICE
    function price() public view returns(uint) {
        return Price;
    }

    // FETCH USER BALANCE
    function balance(address user) public view returns(uint) {
        return tokens[user];
    }

    // ADD TOKEN
    function add(uint amount) public payable {

        // CONDITIONS
        require(initialized, 'contract has not been initialized');
        require(msg.value == amount * Price, 'insufficient funds');

        // INCREASE TOKEN COUNT FOR SENDER
        tokens[msg.sender] += amount;

        // SEND EVENT
        emit Update(msg.sender, tokens[msg.sender]);
    }

    // REMOVE TOKEN
    function remove(uint amount, address user) public {

        // CONDITIONS
        require(initialized, 'contract has not been initialized');
        require(msg.sender == tasks, 'you cannot call this method');
        require(tokens[user] >= amount, 'user token count exceeded');

        // DECREASE TOKEN COUNT FOR USER
        tokens[user] -= amount;

        // SEND EVENT
        emit Update(user, tokens[user]);
    }

    // TRANSFER TOKENS FROM SENDER TO USER
    function transfer(uint amount, address user) public {

        // CONDITIONS
        require(initialized, 'contract has not been initialized');
        require(tokens[msg.sender] >= amount, 'user token count exceeded');

        // REDUCE TOKENS FROM SENDER, INCREASE THEM FOR USER
        tokens[msg.sender] -= amount;
        tokens[user] += amount;

        // SEND EVENT TO BOTH USERS
        emit Update(msg.sender, tokens[msg.sender]);
        emit Update(user, tokens[user]);
    }
}
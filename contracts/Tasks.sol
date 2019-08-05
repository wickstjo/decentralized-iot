pragma solidity ^0.5.0;

// IMPORT INTERFACES
import { Task } from './Task.sol';
import { Devices } from './Devices.sol';
import { Users } from './Users.sol';
import { Token } from './Token.sol';

contract Tasks {

    // LIST OF OPEN TASKS
    Task[] tasks;

    // HELPER CONTRACTS
    Devices devices;
    Users users;
    Token token;

    // HAS CONTRACT BEEN INITIALIZED
    bool public initialized = false;

    // INITIALIZE HELPER CONTRACTS
    function init(
        Devices _devices,
        Users _users,
        Token _token
    ) public {

        // CONDITION
        require(!initialized, 'contract has already been initialized');

        // SET REFERENCES
        devices = _devices;
        users = _users;
        token = _token;

        // CONFIRM INITIALIZATION
        initialized = true;
    }

    // FETCH ALL OPEN TASKS
    function fetch() public view returns(Task[] memory) {

        // CONDITIONS
        require(initialized, 'helper contracts have not been initialized');
        require(tasks.length > 0, 'no tasks have been posted');

        return tasks;
    }

    // ADD TASK ENTRY
    function add (
        string memory expires,
        uint reputation,
        string memory encryption
    ) public payable {

        // CONDITIONS
        require(initialized, 'helper contracts have not been initialized');
        require(users.exists(msg.sender), 'you are not a registered user');
        require(token.check(msg.sender) >= 1, 'you do not have the tokens to do this');

        // REMOVE A TOKEN FROM SENDER
        token.remove(1, msg.sender);

        // INSTANTIATE NEW TASK
        Task task = (new Task).value(msg.value)(
            msg.sender,
            expires,
            reputation,
            encryption,
            devices,
            users
        );

        // TRANSFER REWARD & PUSH TO LIST
        tasks.push(task);
    }
}
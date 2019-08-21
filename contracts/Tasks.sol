pragma solidity ^0.5.0;

// IMPORT INTERFACES
import { Task } from './Task.sol';
import { Devices } from './Devices.sol';
import { Users } from './Users.sol';
import { Token } from './Token.sol';

contract Tasks {

    // ALL TASKS & USER HISTORY
    Task[] public tasks;

    // INIT STATUS
    bool public initialized = false;

    // APP CONTRACTS
    Devices devices;
    Users users;
    Token token;

    // TASK ADDED EVENT
    event Update (Task[] tasks);

    // INITIALIZE HELPER CONTRACTS
    function init(Devices _devices, Users _users, Token _token) public {

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
        return tasks;
    }

    // ADD TASK ENTRY
    function add(string memory name, uint reputation, string memory encryption) public payable {

        // CONDITIONS
        require(initialized, 'contracts have not been initialized');
        require(users.exists(msg.sender), 'you are not a registered user');
        require(token.balance(msg.sender) >= 1, 'you do not have the tokens to do this');

        // REMOVE A TOKEN FROM SENDER
        token.remove(1, msg.sender);

        // INSTANTIATE NEW TASK
        Task task = (new Task).value(msg.value)(
            msg.sender,
            name,
            reputation,
            encryption,
            tasks.length,
            devices,
            users
        );

        // PUSH TO OPEN LIST & SEND EVENT
        tasks.push(task);
        emit Update(tasks);
    }

    // REMOVE TASK
    function remove(uint index) public {

        // CONDITION
        require(tasks[index] == Task(msg.sender), 'you are not permitted to call this');

        // DELETE & SEND EVENT
        delete tasks[index];
        emit Update(tasks);
    }
}
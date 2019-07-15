pragma solidity ^0.5.0;

// IMPORT DEVICE CONTRACT
import { Task } from './Task.sol';
import { Devices } from './Devices.sol';
import { Users } from './Users.sol';

contract Tasks {

    // LIST OF OPEN TASKS
    Task[] public tasks;

    // HELPER CONTRACTS
    Devices public devices;
    Users public users;
    bool public initialized = false;

    // INITIALIZE HELPER CONTRACTS
    function init(Devices _devices, Users _users) public {

        // CONDITION
        require(!initialized, 'helper contracts have already been initialized');

        // SET VARS
        devices = _devices;
        users = _users;
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

        // CONDITION
        require(initialized, 'helper contracts have not been initialized');
        require(users.exists(msg.sender), 'you are not a registered user');

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
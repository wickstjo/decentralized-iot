pragma solidity ^0.5.0;

// IMPORT INTERFACES
import { Task } from './Task.sol';
import { Devices } from './Devices.sol';
import { Users } from './Users.sol';
import { Token } from './Token.sol';

contract Tasks {

    // ALL TASKS & USER HISTORY
    Task[] public all;
    mapping(address => Task[]) History;

    // INIT STATUS
    bool public initialized = false;

    // APP CONTRACTS
    Devices devices;
    Users users;
    Token token;

    // TASK ADDED EVENT
    event Update (
        Task[] tasks,
        address user,
        Task[] history
    );

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
    function tasks() public view returns(Task[] memory) {
        return all;
    }

    // FETCH USER HISTORY
    function history(address user) public view returns(Task[] memory) {
        return History[user];
    }

    // ADD TASK ENTRY
    function add(uint reputation, string memory encryption) public payable {

        // CONDITIONS
        require(initialized, 'contracts have not been initialized');
        require(users.exists(msg.sender), 'you are not a registered user');
        require(token.balance(msg.sender) >= 1, 'you do not have the tokens to do this');

        // REMOVE A TOKEN FROM SENDER
        token.remove(1, msg.sender);

        // INSTANTIATE NEW TASK
        Task task = (new Task).value(msg.value)(
            msg.sender,
            reputation,
            encryption,
            devices,
            users
        );

        // PUSH TO OPEN LIST & USER HISTORY
        all.push(task);
        History[msg.sender].push(task);

        // SEND EVENT
        emit Update(
            all,
            msg.sender,
            History[msg.sender]
        );
    }
}
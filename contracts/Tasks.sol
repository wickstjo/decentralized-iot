pragma solidity ^0.5.0;

// IMPORT DEVICE CONTRACT
import { Task } from './Task.sol';

contract Tasks {

    // LIST OF OPEN TASKS
    Task[] public tasks;
    address payable public test;

    // FETCH ALL OPEN TASKS
    function fetch() public view returns(Task[] memory) {

        // CONDITIONS
        require(tasks.length > 0, 'no tasks have been posted');
        return tasks;
    }

    // ADD TASK ENTRY
    function add(
        string memory expires,
        uint reputation,
        string memory encryption
    ) public payable {

        // INSTANTIATE NEW TASK
        Task task = (new Task).value(msg.value)(expires, reputation, encryption, msg.sender);

        // TRANSFER REWARD & PUSH TO LIST
        tasks.push(task);
    }
}
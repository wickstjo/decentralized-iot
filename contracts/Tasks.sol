pragma solidity ^0.5.0;

// IMPORT DEVICE CONTRACT
import { Task } from './Task.sol';

contract Tasks {

    // LIST OF OPEN TASKS
    Task[] public tasks;

    // ADD TASK ENTRY
    function add(
        uint32 expires,
        uint reputation,
        uint reward,
        string memory encryption
    ) public payable {

        // INSTANTIATE & PUSH NEW TASK
        tasks.push(
            new Task(expires, reputation, reward, encryption)
        );
    }

    // REMOVE TASK ENTRY
    function remove(uint256 _task) public {

        // MAKE SURE THE SENDER IS THE TASK SELLER
        require(tasks[_task].seller() == msg.sender, 'you are not the seller');

        // REMOVE ENTRY
        delete tasks[_task];
    }

    // FETCH ALL OPEN TASKS
    function fetch() public view returns(Task[] memory) {
        return tasks;
    }
}
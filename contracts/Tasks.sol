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

        // CONDITIONS
        //require(block.timestamp > expires, 'date has expired');
        require(msg.value >= reward, 'reward does not match');

        // INSTANTIATE & PUSH NEW TASK
        tasks.push(
            new Task(expires, reputation, reward, encryption, msg.sender)
        );
    }

    // REMOVE TASK ENTRY
    function remove(uint256 task) public {

        // MAKE SURE THE SENDER IS THE TASK SELLER
        require(tasks[task].buyer() == msg.sender, 'you are not the seller');

        // REMOVE ENTRY
        delete tasks[task];
    }

    // FETCH ALL OPEN TASKS
    function fetch() public view returns(Task[] memory) {
        return tasks;
    }
}
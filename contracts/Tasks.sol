pragma solidity ^0.5.0;

// IMPORT DEVICE CONTRACT
import { Task } from './Task.sol';

contract Tasks {

    // LIST OF OPEN TASKS
    Task[] public tasks;

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
        uint reward,
        string memory encryption
    ) public payable {

        // CONDITIONS
        require(msg.value == reward, 'reward does not match');

        // INSTANTIATE & PUSH NEW TASK
        tasks.push(new Task(
            expires,
            reputation,
            reward,
            encryption,
            msg.sender
        ));
    }

    // REMOVE COMPLETED TASKS FROM THE LIST
    function clean() public {
        for (uint x = 0; x < tasks.length; x++) {
            if (tasks[x].completed()) {
                delete tasks[x];
            }
        }
    }
}
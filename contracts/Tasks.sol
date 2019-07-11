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
        uint reward,
        string memory encryption
    ) public payable {

        // CONDITIONS
        require(msg.value == reward, 'reward does not match');

        // INSTANTIATE NEW TASK
        Task task = new Task(
            expires,
            reputation,
            reward,
            encryption,
            msg.sender
        );

        address payable foo = address(uint160(address(task)));
        //foo.transfer(msg.value);
        test = foo;

        // TRANSFER REWARD & PUSH TO LIST
        tasks.push(task);
    }
}
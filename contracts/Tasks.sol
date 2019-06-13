pragma solidity ^0.5.0;

// IMPORT DEVICE CONTRACT
import { Task } from './Task.sol';

contract Tasks {

   // LIST OF TASKS
   Task[] public tasks;

   function add(uint32 expires, uint reputation, uint reward, string memory encryption) public payable {

      // INSTANTIATE NEW TASK
      tasks.push(new Task(expires, reputation, reward, encryption));
   }
}
pragma solidity ^0.5.0;

// IMPORT DEVICE CONTRACT
import { Device } from './Device.sol';

contract Task {

    // BUYER & SELLER
    address payable public buyer;
    address payable public seller;

    // RESPONSE CONTAINER & COMPLETED STATUS
    string[] public data;
    bool public completed;

    // TASK PARAMS
    string public expires;
    uint public reputation;
    string public encryption;
    uint public reward;
    bool public locked;

    // WHEN THE CONTRACT IS CREATED
    constructor(
        address payable _buyer,
        string memory _expires,
        uint _reputation,
        string memory _encryption
    ) public payable {

        // SET BUYER & STATUS VARS
        buyer = _buyer;
        completed = false;
        locked = false;

        // SET PARAMS
        expires = _expires;
        reputation = _reputation;
        encryption = _encryption;
        reward = msg.value;
    }

    // FETCH TASK DETAILS
    function details() public view returns (string memory, uint, uint, string memory, bool) {
        return (
            expires,
            reputation,
            reward,
            encryption,
            locked
        );
    }

    // ACCEPT TASK
    function accept(Device _device) public payable {

        // CONDITIONS
        require(!locked, 'the contract is locked');
        require(msg.value == reward / 2, 'insufficient funds given');

        // CHECK IF ADDRESS IS A DEVICE
        require(_device.status(), 'device is out of order');
        require(_device.owner() == msg.sender, 'you are not the device owner');

        // CHECK IF SENDER IS REGISTERED
        // CHECK SENDER REPUTATION

        // SET SELLER & LOCK THE CONTRACT
        seller = msg.sender;
        locked = true;
    }

    // SUBMIT DATA
    function submit(string memory ipfs) public {

        // CONDITIONS
        require(msg.sender == seller, 'you are not the seller');

        // !!! SUBMIT TO BUYER USER CONTRACT

        // PUSH IPFS HASH TO CONTAINER & MARK TASK AS COMPLETED
        data.push(ipfs);
        completed = true;
    }

    // DESTROY THE CONTRACT & PAY PARTICIPANTS
    function release() public {

        // CONDITIONS
        require(locked, 'task has not been accepted yet');

        // IF THE SELLER HAS FULFILLED HIS TASK, SEND ETH TO HIM
        if (completed) {
            selfdestruct(seller);

        // OTHERWISE, SEND BUYER THE REMAINING ETH
        } else {
            selfdestruct(buyer);
        }
    }
}
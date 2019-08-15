pragma solidity ^0.5.0;

// IMPORT HELPER CONTRACT INTERFACES
import { Devices } from './Devices.sol';
import { Users } from './Users.sol';

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

    // HELPER CONTRACTS
    Devices public devices;
    Users public users;

    // WHEN THE CONTRACT IS CREATED
    constructor(
        address payable _buyer,
        string memory _expires,
        uint _reputation,
        string memory _encryption,
        Devices _devices,
        Users _users
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

        // SET CONTRACTS
        devices = _devices;
        users = _users;
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
    function accept(string memory id) public payable {

        // CONDITIONS
        require(!locked, 'the contract is locked');
        require(msg.value >= reward / 2, 'insufficient funds given');

        // CHECK THAT USER & DEVICE ARE REGISTERED
        require(users.exists(msg.sender), 'you are not a registered user');
        require(devices.exists(id), 'the device is not registered');

        // DEVICE CONDITIONS
        require(devices.fetch(id).status(), 'device is not active');
        require(devices.fetch(id).owner() == msg.sender, 'you are not the device owner');
        require(users.fetch(msg.sender).reputation() >= reputation, 'not enough reputation');

        // SET SELLER & LOCK THE CONTRACT
        seller = msg.sender;
        locked = true;

        // SEND ALERT
        devices.fetch(id).assign(address(this), msg.sender);
    }

    // SUBMIT DATA
    function submit(string memory ipfs) public {

        // CONDITIONS
        require(msg.sender == seller, 'you are not the seller');

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
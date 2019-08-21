pragma solidity ^0.5.0;

// IMPORT HELPER CONTRACT INTERFACES
import { Devices } from './Devices.sol';
import { Users } from './Users.sol';
import { Tasks } from './Tasks.sol';

contract Task {

    // BUYER & SELLER
    address payable public buyer;
    address payable public seller;

    // TASK PARAMS
    string public name;
    uint public reputation;
    string public encryption;
    uint public reward;
    bool public locked;

    // TASK INDEX
    uint position;

    // HELPER CONTRACTS
    Devices public devices;
    Users public users;
    Tasks public tasks;

    // WHEN THE CONTRACT IS CREATED
    constructor(
        address payable _buyer,
        string memory _name,
        uint _reputation,
        string memory _encryption,
        uint _position,
        Devices _devices,
        Users _users
    ) public payable {

        // SET PARAMS
        name = _name;
        reputation = _reputation;
        encryption = _encryption;
        position = _position;

        buyer = _buyer;
        locked = false;
        reward = msg.value;

        // SET CONTRACTS
        devices = _devices;
        users = _users;
        tasks = Tasks(msg.sender);
    }

    // FETCH TASK DETAILS
    function details() public view returns (string memory, uint, uint, string memory, bool) {
        return (
            name,
            reputation,
            reward,
            encryption,
            locked
        );
    }

    // ACCEPT TASK
    function accept(string memory id) public payable {

        // CHECK LOCKED STATUS & FUNDS
        require(!locked, 'the contract is locked');
        require(msg.value >= reward / 2, 'insufficient funds given');

        // CHECK REGISTERATION STATUS
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

        // ADD RESPONSE TO BUYER
        users.fetch(buyer).add(name, ipfs);

        // REMOVE TASK & SELF DESTRUCT
        tasks.remove(position);
        selfdestruct(seller);
    }

    // DESTROY THE CONTRACT & PAY PARTICIPANTS
    function release() public {

        // CONDITIONS
        require(msg.sender == buyer, 'You are not the creator');
        require(!locked, 'Task has already been accepted');

        // REMOVE TASK & SELF DESTRUCT
        tasks.remove(position);
        selfdestruct(buyer);
    }
}
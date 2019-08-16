pragma solidity ^0.5.0;

// IMPORT HELPER CONTRACT INTERFACES
import { Devices } from './Devices.sol';
import { Users } from './Users.sol';

contract Task {

    // BUYER & SELLER
    address payable public buyer;
    address payable public seller;

    // TASK PARAMS
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
        uint _reputation,
        string memory _encryption,
        Devices _devices,
        Users _users
    ) public payable {

        // SET PARAMS
        buyer = _buyer;
        locked = false;
        reputation = _reputation;
        encryption = _encryption;
        reward = msg.value;

        // SET CONTRACTS
        devices = _devices;
        users = _users;
    }

    // FETCH TASK DETAILS
    function details() public view returns (uint, uint, string memory, bool) {
        return (
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

        // ADD RESPONSE TO BUYER & SELF DESTRUCT
        users.fetch(buyer).add(ipfs);
        selfdestruct(seller);
    }

    // DESTROY THE CONTRACT & PAY PARTICIPANTS
    function release() public {

        // CONDITIONS
        require(msg.sender == buyer, 'You are not the creator');
        require(!locked, 'Task has already been accepted');

        // SELF DESTRUCT
        selfdestruct(buyer);
    }
}
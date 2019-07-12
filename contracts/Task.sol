pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

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

    // WHEN THE CONTRACT IS CREATED
    constructor(
        string memory _expires,
        uint _reputation,
        string memory _encryption,
        address payable _buyer
    ) public payable {

        // SET BUYER & STATUS VARS
        buyer = _buyer;
        completed = false;

        // SET PARAMS
        expires = _expires;
        reputation = _reputation;
        encryption = _encryption;
        reward = msg.value;
    }

    // FETCH TASK DETAILS
    function details() public view returns (
        address payable,
        address payable,
        string memory,
        uint, uint,
        string memory,
        bool,
        string[] memory
    ) {
        return (
            buyer,
            seller,
            expires,
            reputation,
            reward,
            encryption,
            completed,
            data
        );
    }

    // ACCEPT TASK
    function accept(Device _device) public payable {

        // CONDITIONS
        require(seller == 0x0000000000000000000000000000000000000000, 'another user has accepted the task');
        require(msg.value == reward / 2, 'insufficient funds given');
        require(_device.status(), 'device is out of order');
        require(_device.owner() == msg.sender, 'you are not the device owner');

        // CHECK IF SENDER IS REGISTERED
        // CHECK SENDER REPUTATION

        // SET SELLER & LOCK THE CONTRACT
        seller = msg.sender;
    }

    // SUBMIT DATA
    function submit(string memory ipfs) public {

        // CONDITIONS
        require(msg.sender == seller, 'you are not the seller');

        // PUSH IPFS HASH TO CONTAINER
        data.push(ipfs);

        // MARK TASK AS COMPLETED
        completed = true;
    }

    // DESTROY THE CONTRACT & PAY PARTICIPANTS
    function release() public {

        // IF THE SELLER HAS FULFILLED HIS TASK, SEND ETH TO HIM
        if (completed) {
            selfdestruct(seller);

        // OTHERWISE, SEND BUYER THE REMAINING ETH
        } else {
            selfdestruct(buyer);
        }
    }
}
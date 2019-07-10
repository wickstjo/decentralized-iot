pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Task {

    // RELEVANT ADDRESSES
    address payable public buyer;
    address payable public seller;

    // ASSIGNED DEVICE & TASK STATUSES
    address public device;
    bool public locked;
    bool public completed;

    // RESPONSE CONTAINER
    string[] public data;

    // TERMS
    string public expires;
    uint public reputation;
    uint public reward;
    string public encryption;

    // WHEN THE CONTRACT IS CREATED
    constructor(
        string memory _expires,
        uint _reputation,
        uint _reward,
        string memory _encryption
    ) public payable {

        require(msg.value == _reward, 'insufficient funds');

        // SET BUYER & STATUS VARS
        buyer = msg.sender;
        locked = false;
        completed = false;

        // SET TERMS
        expires = _expires;
        reputation = _reputation;
        reward = _reward;
        encryption = _encryption;
    }

    // FETCH TASK DETAILS
    function details() public view returns (address, string memory, uint, uint, string memory, bool, bool, string[] memory, address) {
        return (
            buyer,
            expires,
            reputation,
            reward,
            encryption,
            locked,
            completed,
            data,
            seller
        );
    }

    // ACCEPT CONTRACT
    function accept(address _device) public payable {

        // CONDITIONS
        require(!locked, 'task is locked');
        require(msg.value == reward / 2, 'insufficient funds given');

        // CHECK IF SENDER IS REGISTERED
        // CHECK IF DEVICE EXISTS

        // SET SELLER & LOCK THE CONTRACT
        seller = msg.sender;
        locked = true;

        // SET PERFORMING DEVICE
        device = _device;
    }

    // SUBMIT DATA
    function submit(string memory ipfs) public {

        // CONDITIONS
        require(locked, 'task is not locked');
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
pragma solidity ^0.5.0;

contract Task {

   // RELEVANT ADDRESSES
   address payable public buyer;
   address payable public seller;

   // LOCKED STATUS & PERFORMING DEVICE
   bool public locked;
   string public device;

   // DATA RESPONSE CONTAINER
   string[] public data;

   // TERMS
   uint32 public expires;
   uint public reputation;
   uint public reward;
   string public encryption;
   bool completed;

   // WHEN THE CONTRACT IS CREATED
   constructor(uint32 _expires, uint _reputation, uint _reward, string memory _encryption) public payable {

      // CONDITIONS
      require(msg.value >= _reward * 1000, 'insufficient funds given');

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

   // ACCEPT CONTRACT
   function accept(string memory _device) public payable {

      // CONDITIONS
      require(!locked, 'contract is locked');
      require(msg.value < reward / 2, 'insufficient funds given');

      // CHECK IF SENDER IS REGISTERED
      // CHECK IF DEVICE EXISTS

      // SET SELLER & LOCK THE CONTRACT
      seller = msg.sender;
      locked = true;

      // SET PERFORMING DEVICE
      device = _device;
   }

   // SUBMIT DATA
   function submit(string memory location) public {

      // CONDITIONS
      require(msg.sender == seller, 'you are not the seller');

      // PUSH IPFS HASH TO CONTAINER
      data.push(location);
   }

   // DESTROY THE CONTRACT & PAY PARTICIPANTS
   function release() public {

      // CONDITIONS
      require(block.timestamp > expires, 'expiration has not been met');

      // IF THE SELLER HAS FULFILLED HIS TASK, SEND ETH TO HIM
      if (completed) {
         selfdestruct(seller);

      // OTHERWISE, SEND BUYER THE REMAINING ETH
      } else {
         selfdestruct(buyer);
      }
   }
}
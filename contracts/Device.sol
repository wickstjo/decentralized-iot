pragma solidity ^0.5.0;

contract Device {

    // REF VARS
    string public name;
    address payable public owner;

    // HELPERS
    bool public status;
    bool public isset;

    // WHEN CONTRACT IS FIRST BUILT
    constructor(string memory _name, address payable _owner) public {

        // SET REFERENCES
        name = _name;
        owner = _owner;

        // SET BOOLS
        status = true;
        isset = true;
    }

    // TOGGLE CONTRACT STATUS
    function toggle() public {

        // IF THE SENDER IS THE OWNER, TOGGLE STATUS
        require(msg.sender == owner, 'you are not the owner');
        status = !status;
    }

    // DESTROY THE CONTRACT & SEND ETH BACK
    function nuke() public {

         // IF THE SENDER IS THE OWNER, DESTROY CONTRACT
        require(msg.sender == owner, 'you are not the owner');
        selfdestruct(owner);
    }
}
pragma solidity ^0.5.0;

contract Device {

    // REF VARS
    string public name;
    address payable public owner;

    // LATEST ASSIGNED TASK
    address public latest;

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

    // TASK ASSIGNMENT EVENT
    event Assignment(address task);

    // TOGGLE CONTRACT STATUS
    function toggle() public {

        // CONDITIONS
        require(msg.sender == owner, 'you are not the owner');
        status = !status;
    }

    // DESTROY THE CONTRACT & SEND ETH BACK
    function nuke() public {

        // CONDITIONS
        require(msg.sender == owner, 'you are not the owner');
        selfdestruct(owner);
    }

    // FETCH LATEST ASSIGNED TASK
    function task() public view returns(address) {

        // CONDITIONS
        require(address(latest) != 0x0000000000000000000000000000000000000000, 'no assigned task found');
        return latest;
    }

    // ASSIGN TASK TO DEVICE
    function assign(address _task) public {

        // CONDITIONS
        require(msg.sender == owner, 'you are not the owner');
        require(status, 'device is out of commission');

        // ASSIGN TASK & SEND EVENT
        latest = _task;
        emit Assignment(_task);
    }
}
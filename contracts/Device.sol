pragma solidity ^0.5.0;

contract Device {

    // DEVICE PARAMS
    address payable public owner;
    string name;

    // LATEST ASSIGNED TASK
    address public latest;

    // HELPERS
    bool public status;
    bool public isset;

    // WHEN CONTRACT IS FIRST BUILT
    constructor(address payable _owner, string memory _name) public {

        // SET PARAMS
        owner = _owner;
        name = _name;

        // SET BOOLS
        status = true;
        isset = true;
    }

    // EVENTS
    event Assignment(address task);
    event Toggled(bool status);

    // TOGGLE CONTRACT STATUS
    function toggle() public {

        // CONDITIONS
        require(msg.sender == owner, 'you are not the owner');

        // EXECUTE & EMIT EVENT
        status = !status;
        emit Toggled(status);
    }

    // FETCH DETAILS
    function details() public view returns(string memory, address payable, bool) {
        return (
            name,
            owner,
            status
        );
    }

    // ASSIGN TASK TO DEVICE
    function assign(address _task, address payable sender) public {

        // CONDITIONS
        require(sender == owner, 'you are not the owner');
        require(status, 'device is out of commission');

        // ASSIGN TASK & SEND EVENT
        latest = _task;
        emit Assignment(_task);
    }
}
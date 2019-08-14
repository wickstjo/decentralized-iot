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

    // TASK ASSIGNMENT EVENT
    event Assignment(address task);

    // TOGGLE CONTRACT STATUS
    function toggle() public {

        // CONDITIONS
        require(msg.sender == owner, 'you are not the owner');
        status = !status;
    }

    // FETCH DETAILS
    function details() public view returns(string memory, address, bool) {
        return (
            name,
            owner,
            status
        );
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
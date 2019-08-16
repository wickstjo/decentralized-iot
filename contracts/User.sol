pragma solidity ^0.5.0;

contract User {

    // USER PARAMS
    string public name;
    uint256 public joined;
    uint public reputation;
    bool public isset;

    // TASK RESULTS
    mapping(address => string) results;

    constructor(string memory _name, uint256 _joined) public {
        name = _name;
        joined = _joined;
        reputation = 1;
        isset = true;
    }

    // FETCH USER DETAILS
    function details() public view returns(string memory, uint256, uint) {
        return (name, joined, reputation);
    }

    // ADD TASK RESULT
    function add(string memory ipfs) public {
        results[msg.sender] = ipfs;
    }

    // FETCH TASK RESULT
    function fetch(address task) public view returns (string memory) {

        // CONDITION
        require(bytes(results[task]).length != 0, 'No response found');
        return results[task];
    }
}
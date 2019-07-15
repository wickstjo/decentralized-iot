pragma solidity ^0.5.0;

contract User {

    string public name;
    uint256 public joined;
    uint public reputation;
    bool public isset;

    constructor(string memory _name, uint256 _joined) public {
        name = _name;
        joined = _joined;
        reputation = 0;
        isset = true;
    }

    // FETCH USER DATA
    function fetch() public view returns(string memory, uint256, uint) {
        return (name, joined, reputation);
    }
}
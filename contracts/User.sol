pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract User {

    // USER PARAMS
    string public name;
    uint256 public joined;
    uint public reputation;
    bool public isset;

    // ANSWER STRUCT
    struct answer {
        address location;
        string name;
        string ipfs;
        uint index;
    }

    // TASK RESULTS
    answer[] Results;

    // TASK COMPLETED EVENT
    event Finish(answer[] results);

    constructor(string memory _name, uint256 _joined) public {
        name = _name;
        joined = _joined;
        reputation = 1;
        isset = true;
    }

    // FETCH USER DETAILS
    function details() public view returns(string memory, uint256, uint) {
        return (
            name,
            joined,
            reputation
        );
    }

    // FETCH ALL RESULTS
    function results() public view returns(answer[] memory) {
        return Results;
    }

    // ADD RESULT
    function add(string memory _name, string memory _ipfs) public {

        // CONSTRUCT TEMP ANSWER
        answer memory temp = answer({
            location: msg.sender,
            name: _name,
            ipfs: _ipfs,
            index: Results.length
        });

        // PUSH RESULT & SEND EVENT
        Results.push(temp);
        emit Finish(Results);
    }

    // FETCH SPECIFIC RESULT
    function result(uint index) public view returns (answer memory) {

        // CONDITION
        require(Results.length >= 0 && Results.length <= index, 'not in range');
        return Results[index];
    }
}
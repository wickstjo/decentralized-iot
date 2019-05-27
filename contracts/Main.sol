pragma solidity ^0.5.0;

contract Main {

    string message = "this is a function";
    string public foobar = "this is a variable";

    function getMessage() public view returns(string memory) {
        return message;
    }
}
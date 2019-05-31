pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Main {

    string[] public people;

    // ADD PERSON
    function add(string memory person) public {
        people.push(person);
    }

    // FETCH PERSON
    function person(uint id) public view returns(string memory) {
        return people[id];
    }

    // FETCH EVERYONE
    function everyone() public view returns(string[] memory) {
        return people;
    }
}
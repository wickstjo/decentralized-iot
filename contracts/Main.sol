pragma solidity ^0.5.0;

// IMPORT HELPER CONTRACTS
import { Users } from "./Users.sol";
import { Devices } from "./Devices.sol";

contract Main {

    // ADD USER
    function add_user(address _location, address _owner, string memory _name) public {
        Users(_location).set(_owner, _name);
    }

    function foobar(address _location) public view returns(string memory) {
        return Users(_location).foob();
    }
}
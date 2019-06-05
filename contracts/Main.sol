pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

// IMPORT HELPER CONTRACTS
import { Users } from "./Users.sol";
import { Devices } from "./Devices.sol";

contract Main {

    // ADD USER
    function add_user(
        address _location,
        address _owner,
        string memory _name
    ) public {
        Users(_location).set(_owner, _name);
    }

    // FETCH USER DATA
    function fetch_user(
        address _location,
        address _user
    ) public view returns(Users.User memory) {
        return Users(_location).fetch(_user);
    }
}
pragma solidity ^0.5.0;

// IMPORT & DECONSTRUCT HELPER CONTRACTS
import { Users } from "./Users.sol";
import { Devices } from "./Devices.sol";

contract Main {

    // HELPER INSTANCES
    Users users;
    Devices devices;

    // BIND HELPER INSTANCES
    constructor(address users_location, address devices_location) public {
        users = Users(users_location);
        devices = Devices(devices_location);
    }

    // ADD USER
    function add_user(address _owner, string memory _name) public {
        users.set(_owner, _name);
    }
}
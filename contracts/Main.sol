pragma solidity ^0.5.0;

// IMPORT USERS CONTRACT
import "./Users.sol" as users;

// IMPORT DEVICES CONTRACT
import "./Devices.sol" as devices;

contract Main {

    // CONTRACT MASTER
    address private master = 0x0663713B3eBab96650b0B8b2a48015415538cd4c;

    // CHECK PERMISSION TO EXECUTE
    function permission(address sender) public view returns(bool) {

        // DEFAULT TO FALSE
        bool response = false;

        // IF SENDER IS MASTER, CHANGE TO TRUE
        if (sender == master) {
            response = true;
        }

        // RETURN RESPONSE
        return response;
    }
}
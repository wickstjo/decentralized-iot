pragma solidity ^0.5.0;

// IMPORT DEVICE CONTRACT
import { Device } from './Device.sol';

contract Devices {

    // HASHMAP OF DEVICES
    mapping (string => Device) devices;

    // CHECK IF DEVICE EXISTS
    function exists(string memory id) public view returns(bool) {
        if (address(devices[id]) != 0x0000000000000000000000000000000000000000) {
            return devices[id].isset();
        }

        return false;
    }

    // CHECK IF SENDER IS DEVICE OWNER
    function isOwner(string memory id, address sender) public view returns(bool) {
        if (exists(id)) {
            if (devices[id].owner() == sender) {
                return true;
            }
        }

        return false;
    }

    // IF THE DEVICE EXISTS, RETURN DATA
    function fetch(string memory id) public view returns(Device) {

        // CONDITION
        require(exists(id), 'device does not exist');

        return devices[id];
    }

    // CREATE NEW DEVICE INSTANCE
    function add(string memory id) public {

        // IF THE ID DOES NOT EXIST, INSTANTIATE & PUSH NEW DEVICE
        require(!exists(id), 'device already exist');
        devices[id] = new Device(msg.sender);
    }
}
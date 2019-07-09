pragma solidity ^0.5.0;

// IMPORT DEVICE CONTRACT
import { Device } from './Device.sol';

contract Devices {

    // HASHMAP OF DEVICES
    mapping (string => Device) devices;

    // IF THE DEVICE EXISTS, RETURN DATA
    function fetch(string memory id) public view returns(Device) {

        // CONDITIONS
        require(address(devices[id]) != 0x0000000000000000000000000000000000000000, 'device does not exist');
        return devices[id];
    }

    // CREATE NEW DEVICE INSTANCE
    function add(string memory id, string memory name) public {

        // IF THE ID DOES NOT EXIST, INSTANTIATE & PUSH NEW DEVICE
        require(address(devices[id]) == 0x0000000000000000000000000000000000000000, 'device already exist');
        devices[id] = new Device(name, msg.sender);
    }

    // REMOVE DEVICE ENTRY
    function remove(string memory id) public {

        // CONDITIONS
        require(address(devices[id]) != 0x0000000000000000000000000000000000000000, 'device does not exist');
        require(msg.sender == devices[id].owner(), 'you are not the owner');

        // REMOVE ENTRY
        delete devices[id];
    }
}
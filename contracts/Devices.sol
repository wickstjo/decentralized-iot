pragma solidity ^0.5.0;

// IMPORT DEVICE CONTRACT
import { Device } from './Device.sol';

contract Devices {

    // HASHMAP OF DEVICES
    mapping (string => Device) devices;

    // FETCH DEVICE ENTRY
    function fetch(string memory id) public view returns(Device) {

        // IF THE DEVICE EXISTS, RETURN DATA
        require(devices[id].isset(), 'device does not exist');
        return devices[id];
    }

    // CREATE NEW DEVICE INSTANCE
    function add(
        string memory id,
        string memory name,
        address payable owner
    ) public {

        // IF THE ID DOES NOT EXIST, INSTANTIATE & PUSH NEW DEVICE
        require(!devices[id].isset(), 'device already exist');
        devices[id] = new Device(name, owner);
    }

    // REMOVE DEVICE ENTRY
    function remove(string memory id) public {

        // CONDITIONS
        require(devices[id].isset(), 'device already exist');
        require(msg.sender == devices[id].owner(), 'you are not the owner');

        // REMOVE ENTRY
        delete devices[id];
    }
}
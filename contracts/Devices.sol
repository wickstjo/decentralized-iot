pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

// IMPORT DEVICE CONTRACT
import { Device } from './Device.sol';
import { Users } from './Users.sol';

contract Devices {

    // STORAGE HASHMAPS
    mapping (string => Device) devices;
    mapping (address => string[]) collections;

    // INITIALIZED STATUS
    bool initialized = false;

    // HELPER CONTRACT
    Users users;

    // INITIALIZE PARAMS
    function init(Users _users) public {

        // CONDITION
        require(!initialized, 'contract has already been initialized');

        // SET PARAMS
        users = _users;
        initialized = true;
    }

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

    // FETCH OWNER DEVICE COLLECTION
    function collection(address sender) public view returns(string[] memory) {
        return collections[sender];
    }

    // CREATE NEW DEVICE INSTANCE
    function add(string memory id) public {

        // IF THE ID DOES NOT EXIST
        require(initialized, 'contract has not been initialized');
        require(!exists(id), 'device already exist');
        require(users.exists(msg.sender), 'you are not a registered user');

        // PUSH NEW DEVICE & ADD TO OWNERS COLLECTION
        devices[id] = new Device(msg.sender);
        collections[msg.sender].push(id);
    }
}
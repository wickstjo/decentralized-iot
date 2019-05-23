pragma solidity ^0.5.0;

contract Main {

    // WHITELIST
    mapping (address => User) public whitelist;

    // DECLARE master
    address public master = 0xFffC9F737D80E9031F8b1B01D7FAF59Ce45def3B;

    // USER OBJECT
    struct User {
        string name;
        string permission;
        uint256 timestamp;
        bool modified;
    }

    // ADD MEMBER
    function add(string memory _name, string memory _permission, address _owner) public {

        // MAKE SURE CALLER ADDRESS IS master
        if (msg.sender == master) {

            // CHECK THAT ENTRY DOESNT ALREADY EXIST IN MAP
            if (whitelist[_owner].timestamp == 0) {

                // GENERATE & PUSH NEW STRUCT
                whitelist[_owner].name = _name;
                whitelist[_owner].permission = _permission;
                whitelist[_owner].timestamp = now;
            }
        }
    }

    // CHANGE PERMISSION OF EXISTING USER
    function change(address _owner, string memory _permission) public {

        // MAKE SURE CALLER ADDRESS IS master
        if (msg.sender == master) {

            // MAKE SURE THAT ENTRY EXISTS
            if (whitelist[_owner].timestamp != 0) {
                whitelist[_owner].permission = _permission;
            }
        }
    }
}
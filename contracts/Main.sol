pragma solidity ^0.5.0;

contract Main {

    // USER STRUCT
    struct User {
        address owner;
        string name;
        Device[] devices;
    }

    // DEVICE STRUCT
    struct Device {
        address id;
        string name;
    }

    // ARRAY OF USERS
    User[] users;

    // ADD USER
    function add_user(address _owner, string memory _name) public {

        // MAKE SURE THAT USER DOESNT EXIST
        if (!user_exists(_owner)) {

            // CREATE TEMP DEVICE ARRAY
            Device[] memory temp;

            // PUSH NEW USER OBJECT TO ARRAY
            users.push(User({
                owner: _owner,
                name: _name,
                devices: temp
            }));
        }
    }

    // CHECK IF USER EXISTS
    function user_exists(address user) internal view returns(bool) {

        // DEFAULT TO FALSE
        bool response = false;

        // LOOP THROUGH USERS
        for(uint i = 0; i < users.length; i++) {

            // IF ITS FOUND -- CHANGE RESPONSE TO TRUE & STOP LOOPING
            if (users[i].owner == user) {
                response = true;
                break;
            }
        }

        // FINALLY RETURN
        return response;
    }

    // CHECK IF USER EXISTS
    function device_exists(address owner, address device) internal view returns(bool) {

        // DEFAULT TO FALSE
        bool response = false;

        // MAKE SURE OWNER EXISTS
        if (user_exists(owner)) {

            // FETCH USER
            User memory user = find_user(owner);

            // LOOP THROUGH DEVICES
            for(uint i = 0; i < user.devices.length; i++) {

                // IF ITS FOUND -- CHANGE RESPONSE TO TRUE & STOP LOOPING
                if (user.devices[i].id == device) {
                    response = true;
                    break;
                }
            }
        }

        // FINALLY RETURN
        return response;
    }

    function find_user(address owner) internal view returns(User memory) {

        // LOOP THROUGH
        for(uint i = 0; i < users.length; i++) {

            // IF ITS FOUND -- CHANGE RESPONSE TO TRUE & STOP LOOPING
            if (users[i].owner == owner) {
                return users[i];
            }
        }
    }
}
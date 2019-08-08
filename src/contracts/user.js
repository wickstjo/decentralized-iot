import { transaction, call } from '../funcs/blockchain';

// FETCH USER
function details(user, state) {
    return call({
        query: state.contracts.users.methods.details(user),
        callback: (response) => {
            return {
                name: response[0],
                joined: response[1],
                reputation: response[2],
            }
        }
    })
}

// ADD USER
function add(name, state) {
    return transaction({
        query: state.contracts.users.methods.add(name),
        contract: state.contracts.users._address,
    }, state)
}

export {
    details,
    add
}
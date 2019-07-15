import { transaction, call } from './blockchain';
import { keys } from '../resources/settings.json';

// FETCH USER
function fetch(state) {
    return call({
        query: state.contracts.users.methods.fetch(keys.public),
        callback: (response) => {
            return {
                name: response[0],
                reputation: state.web3.utils.hexToNumber(response[1]),
                joined: state.web3.utils.hexToNumber(response[2])
            }
        }
    })
}

// FETCH USER
function exists(address, state) {
    return call({
        query: state.contracts.users.methods.exists(address),
        callback: (response) => {
            return response;
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
    fetch,
    exists,
    add
}
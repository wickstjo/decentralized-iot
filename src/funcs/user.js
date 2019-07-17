import { transaction, call } from './blockchain';
import { keys } from '../resources/settings.json';

// FETCH USER
function fetch(state) {
    return call({
        query: state.contracts.users.methods.fetch(keys.public),
        callback: (response) => {
            return response;
        }
    })
}

// FETCH USER
function details(state) {
    return call({
        query: state.contracts.users.methods.details(keys.public),
        callback: (response) => {
            return {
                name: response[0],
                joined: response[1],
                reputation: response[2],
            };
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
    details,
    add
}
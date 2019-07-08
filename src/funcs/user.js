import { transaction, call } from './blockchain';
import { keys } from '../resources/settings.json';

// FETCH USER
function fetch(state) {
    return call({
        query: state.contracts.users.methods.fetch(keys.public),
        callback: (response) => {
            return {
                name: response.name,
                reputation: state.web3.utils.hexToNumber(response.reputation),
                joined: state.web3.utils.hexToNumber(response.joined),
                isset: response.isset
            }
        }
    })
}

// ADD USER
function add(state, name) {
    return transaction({
        query: state.contracts.users.methods.add(name),
        contract: state.contracts.users._address,
    }, state)
}

// REMOVE USER
function remove(state) {
    return transaction({
        query: state.contracts.users.methods.remove(),
        contract: state.contracts.users._address,
    }, state)
}

export {
    fetch,
    add,
    remove,
}
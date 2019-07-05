import { transaction, call } from './blockchain';
import { keys } from '../resources/settings.json';

// FETCH USER
function fetch_user(state) {
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
function add_user(state, name) {
    return transaction({
        query: state.contracts.users.methods.add(name),
        contract: state.contracts.users._address,
    }, state)
}

// REMOVE USER
function remove_user(state) {
    return transaction({
        query: state.contracts.users.methods.remove(),
        contract: state.contracts.users._address,
    }, state)
}

export {
    fetch_user,
    add_user,
    remove_user,
}
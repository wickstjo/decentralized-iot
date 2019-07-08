import { transaction, call } from './blockchain';
import { keys } from '../resources/settings.json';

// ---------------- USERS STARTS ----------------

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

// ---------------- USERS ENDS ----------------
// ---------------- LICENCES STARTS ----------------

// CHECK LICENCE STATUS
function check_price(state) {
    return call({
        query: state.contracts.licences.methods.price(),
        callback: (response) => {
            return response;
        }
    })
}

// CHECK LICENCE STATUS
function check_duration(state) {
    return call({
        query: state.contracts.licences.methods.duration(),
        callback: (response) => {
            return response;
        }
    })
}

// CHECK LICENCE STATUS
function check_licence(state) {
    return call({
        query: state.contracts.licences.methods.check(keys.public),
        callback: (response) => {
            return response;
        }
    })
}

// BUY LICENCE
function buy_licence(state, amount) {
    return check_price(state).then(({ success, data }) => {
        if (success) {
            return transaction({
                query: state.contracts.licences.methods.buy(amount),
                contract: state.contracts.licences._address,
                payable: amount * data
            }, state)
        }
    })
}

// REMOVE LICENCE
function remove_licence(state) {
    return transaction({
        query: state.contracts.licences.methods.remove(),
        contract: state.contracts.licences._address,
    }, state)
}

// ---------------- LICENCES ENDS ----------------

export {
    fetch_user,
    add_user,
    remove_user,
    check_price,
    check_duration,
    check_licence,
    buy_licence,
    remove_licence
}
import { transaction, call } from '../funcs/blockchain';

// FETCH USER
function collection(state) {
    return call({
        query: state.contracts.users.methods.collection(),
        callback: (response) => {
            return response;
        }
    })
}

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

// USER ADDED EVENT
function event(state) {
    return state.contracts.users.events.Update();
}

export {
    collection,
    details,
    add,
    event
}
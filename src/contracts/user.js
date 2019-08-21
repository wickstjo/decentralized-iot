import { transaction, call, assemble } from '../funcs/blockchain';

// FETCH ALL USERS
function all(state) {
    return call({
        query: state.contracts.users.methods.all()
    })
}

// FETCH USER ADDRESS
function fetch(user, state) {
    return call({
        query: state.contracts.users.methods.fetch(user)
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

// FETCH USER DETAILS
function details(location, state) {

    // GENERATE REFERENCE
    const contract = assemble({
        address: location,
        contract: 'user'
    }, state);

    return call({
        query: contract.methods.details(),
        modify: (response) => {
            return {
                name: response[0],
                joined: response[1],
                reputation: response[2]
            }
        }
    })
}

// FETCH USER TASK RESULTS
function results(location, state) {

    // GENERATE REFERENCE
    const contract = assemble({
        address: location,
        contract: 'user'
    }, state);

    return call({
        query: contract.methods.results()
    })
}

export {
    all,
    fetch,
    add,
    event,
    details,
    results
}
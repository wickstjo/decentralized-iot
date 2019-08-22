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

// USER EVENTS
function event({ location, name, action }, state) {

    // PLACEHOLDER
    let contract = null;

    // FETCH CORRECT CONTRACT
    switch (location) {

        // NO DEVICE WAS SPECIFIED
        case undefined:
            contract = state.contracts.users;
        break;

        // OTHERWISE
        default:
            contract = assemble({
                address: location,
                contract: 'user'
            }, state);
        break;
    }

    // STATUS CHANGED EVENT
    const event = contract.events[name]();

    // SUBSCRIBE
    event.on('data', event => {
        action(event.returnValues)
    })

    return event;
}

export {
    all,
    fetch,
    add,
    event,
    details,
    results
}
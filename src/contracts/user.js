import { transaction, call, assemble } from '../funcs/blockchain';

// FETCH USER
function collection(state) {
    return call({
        query: state.contracts.users.methods.collection()
    })
}

// FETCH USER
function details(user, state) {
    return call({
        query: state.contracts.users.methods.details(user),
        modify: (response) => {
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

function fetch(user, state) {
    return call({
        query: state.contracts.users.methods.fetch(user)
    })
}

// TASK TASK RESULT
function check(task, user, state) {

    // GENERATE REFERENCE
    const contract = assemble({
        address: user,
        contract: 'user'
    }, state);

    return call({
        query: contract.methods.fetch(task)
    })
}

export {
    collection,
    details,
    add,
    event,
    fetch,
    check
}
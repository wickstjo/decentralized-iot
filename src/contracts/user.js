import { transaction, call, assemble } from '../funcs/blockchain';

// INITIALIZE
function init(task_manager, state) {
    return transaction({
       query: state.managers.user.methods.init(task_manager),
       contract: state.managers.user._address
    }, state)
 }

// FETCH ALL USERS
function fetch_all(state) {
    return call({
        query: state.managers.user.methods.fetch_all()
    })
}

// FETCH USER ADDRESS
function fetch_user(user, state) {
    return call({
        query: state.managers.user.methods.fetch_user(user)
    })
}

// ADD USER
function add(name, state) {
    return transaction({
        query: state.managers.user.methods.add(name),
        contract: state.managers.user._address
    }, state)
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
    init,
    fetch_all,
    fetch_user,
    add,
    results
}
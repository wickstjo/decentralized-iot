import { transaction, assemble } from '../funcs/blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.managers.user.methods,
        address: state.managers.user._address
    }
}

// INITIALIZE
function init(task_manager, state) {
    const { manager, address } = refs(state);

    return transaction({
       query: manager.init(task_manager),
       contract: address
    }, state)
 }

// FETCH ALL USERS
function fetch_all(state) {
    return refs(state).manager.fetch_all().call()
}

// FETCH USER ADDRESS
async function user_details(user, state) {
    const { manager } = refs(state);

    // USER CONTRACT LOCATION
    const location = await manager.fetch_user(user).call();

    // CONSTRUCT USER CONTRACT
    const contract = assemble({
        address: location,
        contract: 'user'
    }, state);

    return {
        name: await contract.methods.name().call(),
        reputation: await contract.methods.reputation().call()
    }
}

// ADD USER
function add(name, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.add(name),
        contract: address
    }, state)
}

export {
    init,
    fetch_all,
    user_details,
    add
}
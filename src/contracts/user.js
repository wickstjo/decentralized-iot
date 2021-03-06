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
    return refs(state).manager.fetch_everyone().call()
}

// FETCH USER ADDRESS
async function user_overview(user, state) {
    const { manager } = refs(state);

    // USER CONTRACT LOCATION
    const location = await manager.fetch_user(user).call();

    // CONSTRUCT USER CONTRACT
    const contract = assemble({
        address: location,
        contract: 'user'
    }, state);

    return {
        details: {
            name: await contract.methods.name().call(),
            reputation: await contract.methods.reputation().call()
        },
        completed: await contract.methods.fetch_completed().call()
    }
}

// FETCH TASK RESULT
async function fetch_result(task, user, state) {
    const { manager } = refs(state);

    // USER CONTRACT LOCATION
    const location = await manager.fetch_user(user).call();

    // CONSTRUCT USER CONTRACT
    const contract = assemble({
        address: location,
        contract: 'user'
    }, state);

    // FETCH THE TASKS DATA STRUCT
    const result = await contract.methods.fetch_result(task).call();

    return {
        ipfs: result.ipfs,
        key: result.key
    }
}

// ADD USER
function add_user(state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.add(),
        contract: address
    }, state)
}

export {
    init,
    fetch_all,
    user_overview,
    fetch_result,
    add_user
}
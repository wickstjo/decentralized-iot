import { transaction, assemble } from '../funcs/blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.managers.task.methods,
        address: state.managers.task._address
    }
}

// INITIALIZE
function init(user_manager, device_manager, token_manager, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.init(2, user_manager, device_manager, token_manager),
        contract: address
    }, state)
}

// FETCH ALL OPEN TASKS
function fetch_open(state) {
    return refs(state).manager.fetch_open().call();
}

// ADD TASK
function add_task({ name, reputation, reward, encryption }, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.add(reputation, 2, encryption, 200),
        contract: address
    }, state)
}

// FETCH TASK DETAILS
async function task_details(task, state) {

    // GENERATE REFERENCE
    const contract = assemble({
        address: task,
        contract: 'task'
    }, state);

    return {
        name: await contract.methods.name().call(),
        owner: await contract.methods.creator().call(),
        reputation: await contract.methods.min_reputation().call(),
        reward: await contract.methods.reward().call(),
        encryption: await contract.methods.public_user_key().call(),
        locked: await contract.methods.locked().call() ? 'Yes' : 'No'
    }
}

// RELEASE TASK
function release_task(task, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.release_task(task),
        contract: address
    }, state)
}

// ACCEPT TASK
async function accept_task(task, device, state) {
    const { manager, address } = refs(state);

    // GENERATE REFERENCE
    const contract = assemble({
        address: task,
        contract: 'task'
    }, state);

    // FETCH THE TASK REWARD
    const reward = await contract.methods.reward().call();

    // ACCEPT THE TASK
    return transaction({
        query: manager.accept_task(task, device),
        contract: address,
        payable: reward / 2
    }, state)
}

// SUBMIT TASK RESULT
function submit_result(task, ipfs, encryption, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.submit_result(task, ipfs, encryption),
        contract: address
    }, state)
}

export {
    init,
    fetch_open,
    add_task,
    task_details,
    release_task,
    accept_task,
    submit_result
}
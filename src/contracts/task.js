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
        query: manager.init(user_manager, device_manager, token_manager),
        contract: address
    }, state)
}

// FETCH ALL OPEN TASKS
function fetch_open(state) {
    return refs(state).manager.fetch_open().call();
}

// FILTER COMPLETED TASKS
function filter(tasks) {
    const container = [];

    // CREATE PROMISES
    tasks.forEach(task => {
        if (task !== '0x0000000000000000000000000000000000000000') {
            container.push(task);
        }
    })

    return container;
}

// ADD TASK
function add({ name, reputation, reward, encryption }, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.add(name, reputation, encryption),
        contract: address,
        payable: reward
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
        owner: await contract.methods.buyer().call(),
        reputation: await contract.methods.reputation().call(),
        reward: await contract.methods.reward().call(),
        encryption: await contract.methods.encryption().call(),
        locked: await contract.methods.locked().call() ? 'Yes' : 'No'
    }
}

export {
    init,
    fetch_open,
    filter,
    add,
    task_details
}
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

// ADD TASK
function add({ name, reputation, reward, key }, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.add(name, reputation, key),
        contract: address,
        payable: reward
    }, state)
}

// FETCH TASK DETAILS
function task_details(task, state) {

    // GENERATE REFERENCE
    const contract = assemble({
        address: task,
        contract: 'task'
    }, state);

    return 'foo';
    
    /* return call({
        query: contract.methods.details(),
        modify: (response) => {
            return {
                name: response[0],
                reputation: response[1],
                reward: response[2],
                encryption: response[3],
                locked: response[4]
            }
        }
    }) */
}

// ACCEPT TASK
function accept(task, device, reward, state) {

    // GENERATE REFERENCE
    const contract = assemble({
        address: task,
        contract: 'task'
    }, state);

    return transaction({
        query: contract.methods.accept(device),
        contract: task,
        payable: reward / 2
    }, state)
}

// SUBMIT DATA TO TASK CONTRACT
function submit(task, hash, state) {

    // GENERATE REFERENCE
    const contract = assemble({
        address: task,
        contract: 'task'
    }, state);

    return transaction({
        query: contract.methods.submit(hash),
        contract: task
    }, state)
}

// RELEASE TASK CONTRACT
function release(task, state) {

    // GENERATE REFERENCE
    const contract = assemble({
        address: task,
        contract: 'task'
    }, state);

    return transaction({
        query: contract.methods.release(),
        contract: task
    }, state)
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

export {
    init,
    fetch_open,
    task_details,
    add,
    accept,
    submit,
    release,
    filter
}
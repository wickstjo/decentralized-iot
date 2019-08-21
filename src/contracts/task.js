import { transaction, call, assemble } from '../funcs/blockchain';

// CHECK INITIALIZED STATUS
function check(state) {
    return call({
        query: state.contracts.tasks.methods.initialized()
    })
}

// INITIALIZE HELPER CONTRACTS
function init(devices, users, token, state) {
    return transaction({
        query: state.contracts.tasks.methods.init(
            devices,
            users,
            token
        ),
        contract: state.contracts.tasks._address
    }, state)
}

// FETCH ALL OPEN TASKS
function fetch(state) {
    return call({
        query: state.contracts.tasks.methods.fetch()
    })
}

// LIST A TASK
function add({ name, reputation, reward, encryption }, state) {
    return transaction({
        query: state.contracts.tasks.methods.add(
            name,
            reputation,
            encryption
        ),
        contract: state.contracts.tasks._address,
        payable: reward
    }, state)
}

// FETCH TASK DETAILS
function details(task, state) {

    // GENERATE REFERENCE
    const contract = assemble({
        address: task,
        contract: 'task'
    }, state);
    
    return call({
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
    })
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

// DEVICE ADDED EVENT
function event({ name, action }, state) {

    // STATUS CHANGED EVENT
    const event = state.contracts.tasks.events[name]();

    // SUBSCRIBE
    event.on('data', event => {
        action(event.returnValues)
    })

    return event;
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
    check,
    init,
    fetch,
    add,
    details,
    accept,
    submit,
    release,
    event,
    filter
}
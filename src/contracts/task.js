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

// FETCH ALL TASKS
function fetch(state) {
    return call({
        query: state.contracts.tasks.methods.fetch()
    })
}

// LIST A TASK
function add({ reputation, reward, encryption }, state) {
    return transaction({
        query: state.contracts.tasks.methods.add(
            reputation,
            encryption
        ),
        contract: state.contracts.tasks._address,
        payable: reward,
        gas: 5000000
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
                reputation: response[0],
                reward: response[1],
                encryption: response[2],
                locked: response[3]
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
        payable: reward / 2,
        gas: 5000000
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
function filter(tasks, state) {

    // PLACEHOLDER
    const promises = [];
    const container = [];

    // CREATE PROMISES
    tasks.forEach(task => {
        promises.push(details(task, state));
    })

    // WAIT FOR ALL OF THEM TO RESOLVE, THEN LOOP THROUGH
    return Promise.all(promises).then(results => {
        results.forEach((result, index) => {

            // PUSH ACTIVE TASKS
            if (result.success && !result.data.locked) {
                container.push(tasks[index])
            }
        })

        return container;
    })
}

// FETCH ALL TASKS
function collection(user, state) {
    return call({
        query: state.contracts.tasks.methods.collection(user)
    })
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
    filter,
    collection
}
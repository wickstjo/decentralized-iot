import { transaction, call, assemble } from '../funcs/blockchain';

// INITIALIZE TOKEN CONTRACT
function init(users, state) {
    return transaction({
       query: state.contracts.devices.methods.init(users),
       contract: state.contracts.devices._address,
    }, state)
 }

// FETCH DEVICE CONTRACT
function fetch(hash, state) {
    return call({
        query: state.contracts.devices.methods.fetch(hash),
        callback: (response) => {
            return response;
        }
    })
}

// ADD DEVICE
function add(hash, state) {
    return transaction({
        query: state.contracts.devices.methods.add(hash),
        contract: state.contracts.devices._address,
    }, state)
}

// FETCH DEVICE CONTRACT
function collection(user, state) {
    return call({
        query: state.contracts.devices.methods.collection(user),
        callback: (response) => {
            return response;
        }
    })
}

// FETCH DEVICE DETAILS
function details(device, state) {
    
    // GENERATE REFERENCE
    const contract = assemble({
        address: device,
        contract: 'device'
    }, state);

    return call({
        query: contract.methods.details(),
        callback: (response) => {
            return {
                "owner": response[0],
                "status": response[1]
            }
        }
    })
}

// FETCH DEVICE CONTRACT
function status(device, state) {
    
    // GENERATE REFERENCE
    const contract = assemble({
        address: device,
        contract: 'device'
    }, state);

    return call({
        query: contract.methods.status(),
        callback: (response) => {
            return response;
        }
    })
}

// TOGGLE STATUS
function toggle(device, state) {

    // GENERATE REFERENCE
    const contract = assemble({
        address: device,
        contract: 'device'
    }, state);

    return transaction({
        query: contract.methods.toggle(),
        contract: device,
    }, state)
}

// FETCH ASSIGNED TASK
function task(device, state) {

    // GENERATE REFERENCE
    const contract = assemble({
        address: device,
        contract: 'device'
    }, state);
    
    return call({
        query: contract.methods.task(),
        callback: (response) => {
            return response;
        }
    })
}

// ASSIGN TASK
function assign(device, task, state) {

    // GENERATE REFERENCE
    const contract = assemble({
        address: device,
        contract: 'device'
    }, state);

    return transaction({
        query: contract.methods.assign(task),
        contract: device
    }, state)
}

// DEVICE ADDED EVENT
function event(state) {
    return state.contracts.devices.events.Update();
}

export {
    init,
    fetch,
    add,
    collection,
    details,
    status,
    toggle,
    task,
    assign,
    event
}
import { transaction, call, assemble } from './blockchain';

// RPI DEVICE ID
const id = 'cdbde0df13a59633a2a55ee9342d9b31650ae27c0a3c0d80bab4b1561f4df16e';

// FETCH DEVICE CONTRACT
function fetch(state) {
    return call({
        query: state.contracts.devices.methods.fetch(id),
        callback: (response) => {
            return response;
        }
    })
}

// ADD DEVICE
function add(state, name) {
    return transaction({
        query: state.contracts.devices.methods.add(id, name),
        contract: state.contracts.devices._address,
    }, state)
}

// REMOVE DEVICE
function remove(state) {
    return transaction({
        query: state.contracts.devices.methods.remove(id),
        contract: state.contracts.devices._address,
    }, state)
}

// FETCH DEVICE CONTRACT
function status(state, device) {
    
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
function toggle(state, device) {

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
function task(state, device) {

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
function assign(state, device, task) {

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

export {
    fetch,
    add,
    remove,
    status,
    toggle,
    task,
    assign
}
import { transaction, call } from './blockchain';

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
function status(state) {
    return call({
        query: state.contracts.devices.methods.status(id),
        callback: (response) => {
            return response;
        }
    })
}

// REMOVE DEVICE
function toggle(state) {
    return fetch(state).then(({ success }) => {
        if (success) {
            return transaction({
                query: state.contracts.devices.methods.toggle(id),
                contract: state.contracts.devices._address,
            }, state)
        }
    })
}

export {
    fetch,
    add,
    remove,
    status,
    toggle
}
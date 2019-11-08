import { transaction, call, assemble } from '../funcs/blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.managers.device.methods,
        address: state.managers.device._address
    }
}

// INITIALIZE
function init(user_manager, task_manager, state) {
    const { manager, address } = refs(state);

    return transaction({
       query: manager.init(user_manager, task_manager),
       contract: address
    }, state)
}

// FETCH USER DEVICE COLLECTION
function collection(state) {
    return refs(state).manager.fetch_collection(state.keys.public).call()
}

// FETCH DEVICE DETAILS
async function device_overview(hash, state) {

    // FETCH THE DEVICES CONTRACT
    const device = await refs(state).manager.fetch_device(hash).call()
    
    // CONSTRUCT CONTRACT
    const contract = assemble({
        address: device,
        contract: 'device'
    }, state);

    return {
        name: await contract.methods.name().call(),
        owner: await contract.methods.owner().call(),
        contract: device,
        active: await contract.methods.active().call() ? 'Yes' : 'No'
    }
}

// ADD DEVICE
function add(hash, name, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.add(hash, name),
        contract: address
    }, state)
}

// TOGGLE DEVICE STATUS
function toggle_status(device, state) {

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

export {
    init,
    collection,
    device_overview,
    add,
    toggle_status
}
import { transaction, assemble } from '../funcs/blockchain';

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
    return refs(state).manager.fetch_collection(state.keys.public).call();
}

// FETCH DEVICE DETAILS
async function device_overview(hash, state) {

    // FETCH THE DEVICES CONTRACT
    const device = await refs(state).manager.fetch_device(hash).call();
    
    // CONSTRUCT CONTRACT
    const contract = assemble({
        address: device,
        contract: 'device'
    }, state);

    return {
        name: await contract.methods.name().call(),
        owner: await contract.methods.owner().call(),
        contract: device
    }
}

// FETCH DEVICE ASSIGNMENT BACKLOG
async function fetch_backlog(hash, state) {

    // FETCH THE DEVICES CONTRACT
    const device = await refs(state).manager.fetch_device(hash).call();
    
    // CONSTRUCT CONTRACT
    const contract = assemble({
        address: device,
        contract: 'device'
    }, state);

    return contract.methods.fetch_backlog().call();
}

// ADD DEVICE
function add_device(hash, name, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.add_device(hash, name),
        contract: address
    }, state)
}

export {
    init,
    collection,
    device_overview,
    fetch_backlog,
    add_device
}
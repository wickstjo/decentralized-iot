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
        query: state.contracts.devices.methods.fetch(hash)
    })
}

// ADD DEVICE
function add(hash, name, state) {
    return transaction({
        query: state.contracts.devices.methods.add(hash, name),
        contract: state.contracts.devices._address,
    }, state)
}

// FETCH DEVICE CONTRACT
function collection(user, state) {
    return call({
        query: state.contracts.devices.methods.collection(user)
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
        modify: (response) => {
            return {
                "name": response[0],
                "owner": response[1],
                "status": response[2]
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
        query: contract.methods.status()
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
        query: contract.methods.task()
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
function added(state) {
    return state.contracts.devices.events.Update();
}

// DEVICE ADDED EVENT
function event({ device, name, action }, state) {

    // PLACEHOLDER
    let contract = null;

    // FETCH CORRECT CONTRACT
    switch (device) {

        // NO DEVICE WAS SPECIFIED
        case undefined:
            contract = state.contracts.devices;
        break;

        // OTHERWISE
        default:
            contract = assemble({
                address: device,
                contract: 'device'
            }, state);
        break;
    }

    // STATUS CHANGED EVENT
    const event = contract.events[name]();

    // SUBSCRIBE
    event.on('data', event => {
        action(event.returnValues)
    })

    return event;
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
    added,
    event
}
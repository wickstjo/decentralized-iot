import { transaction, call, assemble } from './blockchain';

// FETCH ALL TASKS
function fetch(state) {
    return call({
        query: state.contracts.tasks.methods.fetch(),
        callback: (response) => {
            return response;
        }
    })
}

// LIST A TASK
function add({ expires, reputation, reward, encryption }, state) {
    return transaction({
        query: state.contracts.tasks.methods.add(
            expires.toString(),
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
        callback: (response) => {
            return {
                expires: response[0],
                reputation: response[1],
                reward: response[2],
                encryption: response[3],
                locked: response[4]
            }
        }
    })
}

// ACCEPT TASK
function accept(task, device, state) {
    return details(task, state).then(({ success, data }) => {
        if (success) {

            // GENERATE REFERENCE
            const contract = assemble({
                address: task,
                contract: 'task'
            }, state);

            return transaction({
                query: contract.methods.accept(device),
                contract: task,
                payable: data.reward / 2
            }, state)
        }
    })
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

export {
    fetch,
    add,
    details,
    accept,
    submit,
    release,
    test
}
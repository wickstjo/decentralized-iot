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
            reward,
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
                buyer: response[0],
                expires: response[1],
                reputation: response[2],
                reward: response[3],
                encryption: response[4],
                locked: response[5],
                completed: response[6],
                data: response[7],
                seller: response[8]
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
    release
}
import { transaction, call } from './blockchain';
import { keys } from '../resources/settings.json';

// CHECK LICENCE STATUS
function price(state) {
    return call({
        query: state.contracts.licences.methods.price(),
        callback: (response) => {
            return response;
        }
    })
}

// CHECK LICENCE STATUS
function duration(state) {
    return call({
        query: state.contracts.licences.methods.duration(),
        callback: (response) => {
            return response;
        }
    })
}

// CHECK LICENCE STATUS
function check(state) {
    return call({
        query: state.contracts.licences.methods.check(keys.public),
        callback: (response) => {
            return response;
        }
    })
}

// BUY LICENCE
function buy(state, amount) {
    return price(state).then(({ success, data }) => {
        if (success) {
            return transaction({
                query: state.contracts.licences.methods.buy(amount),
                contract: state.contracts.licences._address,
                payable: amount * data
            }, state)
        }
    })
}

// REMOVE LICENCE
function remove(state) {
    return transaction({
        query: state.contracts.licences.methods.remove(),
        contract: state.contracts.licences._address,
    }, state)
}

export {
    price,
    duration,
    check,
    buy,
    remove
}
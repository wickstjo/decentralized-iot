// FETCH DEVICE DATA
function fetch({ contracts }) {
    return contracts.tasks.methods.fetch().call();
 }
 
 // ADD DEVICE
 function add({ contracts, metamask }, expiration, reputation, reward, encryption) {
    return contracts.tasks.methods.add(
        expiration,
        reputation,
        reward,
        encryption
    ).send({
       from: metamask.user,
       value: reward
    });
 }
 
 // REMOVE DEVICE
 function remove({ contracts, metamask }, index) {
    return contracts.tasks.methods.remove(index).send({
       from: metamask.user
    });
 }
 
 export {
    fetch,
    add,
    remove
 }

rm -rf ./src/contracts
rm -rf ./build
truffle migrate
node ./scripts/transfer.js
#npm start

# truffle console
# Main.deployed().then(function(instance) { app = instance })
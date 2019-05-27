
rm -rf ./src/contracts
rm -rf ./build
truffle migrate
cp -r ./build/contracts ./src/contracts
npm start

# truffle console
# Main.deployed().then(function(instance) { app = instance })
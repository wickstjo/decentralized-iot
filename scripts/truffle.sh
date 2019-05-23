rm -rf ./src/compiled
truffle migrate ./src/
cp -r ./build/contracts ./src/compiled

# truffle console
# Main.deployed().then(function(instance) { app = instance })
module.exports = {
  networks: {
    development: {
      host: "193.167.32.156",
      port: 8888,
      network_id: "*", // Match any network id
      gas: 5000000
    }
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
        enabled: true, // Default: false
        runs: 200      // Default: 200
        }
      }
    }
  }
}
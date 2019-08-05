const { gateways } = require('./src/resources/settings.json');

module.exports = {
   networks: {
      development: {
         host: gateways.blockchain.host,
         port: gateways.blockchain.port,
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
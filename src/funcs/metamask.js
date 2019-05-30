// FETCH CURRENT USER
function user({ proxy }) {
   return proxy.selectedAddress;
}

// FETCH CURRENT NETWORK
function network({ proxy }) {
   return networks(proxy.networkVersion);
}

// METAMASK LOGIN
function login({ proxy }) {
   return proxy.enable();
}

// ETHEREUM NETWORKS
function networks(id) {
   switch (id) {
      case '1': {
         return 'main';
      }
      case '3': {
         return 'ropsten';
      }
      case '4': {
         return 'rinkeby';
      }
      default: {
         return 'development';
      }
   }
}

export {
   user,
   network,
   login,
   networks
}
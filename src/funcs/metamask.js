// METAMASK LOGIN
function login({ proxy }) {
   return proxy.enable();
}

// ETHEREUM NETWORKS
function network(id) {
   switch (id) {
      case '1': {
         return 'MAIN';
      }
      case '3': {
         return 'ROPSTEN';
      }
      case '4': {
         return 'RINKEBY';
      }
      default: {
         return 'DEV';
      }
   }
}

export {
   login,
   network,
}
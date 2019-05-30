import { useEffect, useContext } from 'react';
import { Context } from './context';
import { init as init_blockchain } from './funcs/blockchain';

function Init() {

   // ROUTE CONTEXT
   const { state, dispatch } = useContext(Context);

   // CONNECT TO BLOCKCHAIN
   useEffect(() => {

      // CONNECTION PROPS
      const settings = {
         host: '127.0.0.1',
         blockchain: 8545,
         ipfs: 5001
      }

      // INIT WEB3 STUFF
      dispatch({
         type: 'blockchain',
         payload: init_blockchain(settings)
      })
   }, [])


   // !!! DUPLICATES AFTER EACH EVENT

   if (state.proxy !== undefined) {
      state.proxy.on('accountsChanged', accounts => {

         // LOG CHANGE
         console.log('account changed!')

         // UPDATE STATE
         dispatch({
            type: 'user',
            payload: accounts[0]
         })
      })
      state.proxy.on('networkChanged', network => {

         // LOG CHANGE
         console.log('network changed!')

         // UPDATE STATE
         dispatch({
            type: 'network',
            payload: network_name(network)
         })
      })
   }

   return null;
}

// ETHEREUM NETWORKS
function network_name(id) {
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

export default Init;
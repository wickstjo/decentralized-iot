import { useEffect, useContext } from 'react';
import { Context } from './context';

function Metamask() {

   // ROUTE CONTEXT
   const { state, dispatch } = useContext(Context);

   useEffect(() => {
      if (state.web3._currentProvider.host === 'metamask') {

         // TURN OFF AUTO RELOAD ETH NETWORK CHANGE
         state.proxy.autoRefreshOnNetworkChange = false;
         
         // METAMASK USER EVENT
         state.proxy.on('accountsChanged', accounts => {

            // UPDATE STATE
            dispatch({
               type: 'user',
               payload: accounts[0]
            })
         
            // LOG CHANGE
            console.log('user changed!');
         })

         // METAMASK NETWORK CHANGE
         state.proxy.on('networkChanged', network => {

            // UPDATE STATE
            dispatch({
               type: 'network',
               payload: network_name(network)
            })

            // LOG CHANGE
            console.log('network changed!');
         })
      }
   }, [])

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

export default Metamask;
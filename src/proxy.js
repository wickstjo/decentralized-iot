import { useEffect, useContext } from 'react';
import { Context } from './context';
import { user, network, networks } from './funcs/metamask';

function Proxy() {

   // ROUTE CONTEXT
   const { state, dispatch } = useContext(Context);

   // ON LOAD
   useEffect(() => {

      // IF METAMASK IS THE PROXY
      if (state.host === 'metamask') {
         
         // SET METAMASK USER
         dispatch({
            type: 'user',
            payload: user(state)
         })

         // SET METAMASK NETWORK
         dispatch({
            type: 'network',
            payload: network(state)
         })

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
               payload: networks(network)
            })

            // LOG CHANGE
            console.log('network changed!');
         })
      }
   }, [])

   return null;
}

export default Proxy;
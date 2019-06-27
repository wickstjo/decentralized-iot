import { useEffect, useContext } from 'react';
import { Context } from './context';
import { network } from './funcs/metamask';
import { init } from './funcs/blockchain';

function Init() {

   // ROUTE CONTEXT
   const { state, dispatch } = useContext(Context);

   // ON LOAD
   useEffect(() => {

      // SET BLOCKCHAIN REFERENCES
      dispatch({
         type: 'blockchain',
         payload: init()
      })
   }, [])

   // WHEN THE PROXY CHANGES
   useEffect(() => {
      if (state.proxy !== null) {

         // SET METAMASK USER
         dispatch({
            type: 'user',
            payload: state.proxy.selectedAddress
         })
   
         // SET METAMASK NETWORK
         dispatch({
            type: 'network',
            payload: network(state.proxy.networkVersion)
         })
   
         // TURN OFF AUTO RELOAD ETH NETWORK CHANGE
         state.proxy.autoRefreshOnNetworkChange = false;

         // USER CHANGE LISTENER
         state.proxy.on('accountsChanged', response => {

            // UPDATE STATE
            dispatch({
               type: 'user',
               payload: response[0]
            })
         
            // LOG CHANGE
            console.log('user changed!');
         })

         // NETWORK CHANGE LISTENER
         state.proxy.on('networkChanged', response => {

            // UPDATE STATE
            dispatch({
               type: 'network',
               payload: network(response)
            })

            // LOG CHANGE
            console.log('network changed!');
         })

      } else {

         // SET METAMASK USER
         dispatch({
            type: 'user',
            payload: undefined
         })
   
         // SET METAMASK NETWORK
         dispatch({
            type: 'network',
            payload: undefined
         })
      }
   }, [state.proxy])

   return null;
}

export default Init;
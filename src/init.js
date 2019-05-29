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

   // PROXY DETAILS
   useEffect(() => {
      if (state.web3 !== undefined && state.web3._currentProvider.connection !== undefined) {
         dispatch({
            type: 'proxy',
            payload: {
               network: state.web3._currentProvider.connection.networkVersion,
               user: state.web3._currentProvider.connection.selectedAddress
            }
         })
      }
   }, [state.web3])

   return null;
}

export default Init;
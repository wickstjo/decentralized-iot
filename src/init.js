import { useEffect, useContext } from 'react';
import { Context } from './context';
import { init as init_blockchain } from './funcs/blockchain';

function Init() {

   // ROUTE CONTEXT
   const { dispatch } = useContext(Context);

   // ON LOAD
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

   return null;
}

export default Init;
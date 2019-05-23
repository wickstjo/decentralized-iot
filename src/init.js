import { useEffect, useContext } from 'react';
import { Context } from './context';
import { init as init_web3 } from './funcs/blockchain';

function Init() {

   // ROUTE CONTEXT
   const { dispatch } = useContext(Context);

   // CONNECTION PROPS
   const settings = {
      host: '127.0.0.1',
      blockchain: 8545,
      ipfs: 5001
   }

   useEffect(() => {

      // INIT WEB3 STUFF
      dispatch({
         type: 'web3',
         payload: init_web3(settings)
      })

   }, [])

   return null;
}

export default Init;
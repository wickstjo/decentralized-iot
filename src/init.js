import { useEffect, useContext } from 'react';
import { Context } from './context';
import { init } from './funcs/blockchain';

function Init() {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // ON LOAD
   useEffect(() => {

      // CONNECT WITH BLOCKCHAIN GATEWAY
      dispatch({
         type: 'connect',
         payload: init()
      })
      
   }, [])

   return null;
}

export default Init;
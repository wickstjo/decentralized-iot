import { useEffect, useContext } from 'react';
import { Context } from './context';
import { init } from './funcs/blockchain';

function Init() {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // ON LOAD
   useEffect(() => {

      // SET APP TOOLS
      dispatch({
         type: 'tools',
         payload: init()
      })
   }, [])

   return null;
}

export default Init;
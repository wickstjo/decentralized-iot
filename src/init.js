import { useContext, useEffect } from 'react';
import { Context } from "./context";

function Init() {

   // ROUTE CONTEXT
   const { state, dispatch } = useContext(Context);

   useEffect(() => {
      console.log('foo')
   }, [])

   return null;
}

export default Init;
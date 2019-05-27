import React, { useContext } from 'react';
import { Context } from "../context";

function Home() {

   // ROUTE CONTEXT
   const { state } = useContext(Context);

   if (state.connected) {
      return <div>Connected</div>

   // OTHERWISE, SHOW LOADING
   } else { return <div>Loading...</div> }
}

export default Home;
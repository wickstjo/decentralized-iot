import React, { useContext } from 'react';
import { Context } from "../context";

function Header() {

   // STATE CONTEXT
   const { state } = useContext(Context);

   return (
      <div>{ state.block }</div>
   );
}

export default Header;
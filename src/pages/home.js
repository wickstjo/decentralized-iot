import React, { useContext } from 'react';
import { Context } from "../context";

function Content() {

   // ROUTE CONTEXT
   const { state, dispatch } = useContext(Context);

   return (
      <div>Administrate Users</div>
   )
}

export default Content;
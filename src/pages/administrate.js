import React, { useContext } from 'react';
import { Context } from "../context";
import { master, add } from '../funcs/blockchain';

function Content() {

   // ROUTE CONTEXT
   const { state, dispatch } = useContext(Context);

   return (
      <div>Administrate Users</div>
   )
}

export default Content;
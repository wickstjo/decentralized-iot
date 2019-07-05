import React, { useContext } from 'react';
import { Context } from '../context';
import '../interface/css/innerbody.scss';

function Licence() {

   // GLOBAL STATE
   const { state } = useContext(Context);
   
   return <div>Licence{ state.foo }</div>
}

export default Licence;
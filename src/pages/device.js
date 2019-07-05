import React, { useContext } from 'react';
import { Context } from '../context';
import '../interface/css/innerbody.scss';

function Device() {

   // GLOBAL STATE
   const { state } = useContext(Context);
   
   return <div>Device { state.foo }</div>
}

export default Device;
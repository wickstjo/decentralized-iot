import React, { useContext } from 'react';
import { Context } from '../context';
import '../interface/css/innerbody.scss';

function Task() {

   // GLOBAL STATE
   const { state } = useContext(Context);
   
   return <div>Task { state.foo }</div>
}

export default Task;
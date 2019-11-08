import React, { useContext } from 'react';
import { Context } from '../../context';

//import { release } from '../../contracts/task';
//import { assess } from '../../funcs/blockchain';

import Button from '../inputs/button';

function Task({ location }) {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // ADD DEVICE
   function Release() {
      console.log(location, state)
   }

   return (
      <div style={{ textAlign: 'right' }}>
         <Button
            header={ 'accept task' }
            func={ Release }
         />
         <Button
            header={ 'release task' }
            func={ Release }
         />
      </div>
   )
}

export default Task;


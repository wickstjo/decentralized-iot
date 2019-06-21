import React, { useContext } from 'react';
import { Context } from '../context';
import { fetch, add, remove } from '../funcs/contracts/devices';

import Item from './item';

function Home() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   return (
      <div>
         <Item
               header={ 'Fetch Device' }
               func={() => {
                  fetch(state, 'foo1234').then(response => {
                     console.log(response)
                  })
               }}
         />
         <Item
               header={ 'Add Device' }
               func={() => {
                  add(state, 'foo1234', 'apolloRPI').then(() => {
                     console.log('device added successfully');
                  })
               }}
         />
         <Item
               header={ 'Remove Device' }
               func={() => {
                  remove(state, 'foo1234').then(() => {
                     console.log('device removed successfully');
                  })
               }}
         />
      </div>
   )
}

export default Home;
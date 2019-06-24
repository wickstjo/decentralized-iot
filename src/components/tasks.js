import React, { useContext } from 'react';
import { Context } from '../context';
import { fetch, add, remove } from '../funcs/contracts/tasks';

import Item from './item';

function Home() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   return (
      <div>
         <Item
               header={ 'All Tasks' }
               func={() => {
                  fetch(state).then(response => {
                     console.log(response)
                  })
               }}
         />
         <Item
               header={ 'Add Task' }
               func={() => {

                  const expiration = 1571977065;
                  const reputation = 5;
                  const reward = 1000000;
                  const encryption = 'foo1234';

                  add(state, expiration, reputation, reward, encryption).then(() => {
                     console.log('task added successfully');
                  })
               }}
         />
         <Item
               header={ 'Remove Task' }
               func={() => {
                  remove(state, 0).then(() => {
                     console.log('task removed successfully');
                  })
               }}
         />
      </div>
   )
}

export default Home;
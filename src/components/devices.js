import React, { useContext } from 'react';
import { Context } from '../context';
import { fetch, add, remove, status, toggle } from '../funcs/contracts/devices';
import sha256 from 'js-sha256';

import Item from './item';

function Devices() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // HASHED TEST ID
   const test_id = sha256('foo1234');

   return (
      <div>
         <Item
            header={ 'Fetch Device' }
            func={() => {
               fetch(state, test_id).then(response => {
                  console.log(response)
               })
            }}
         />
         <Item
            header={ 'Add Device' }
            func={() => {
               add(state, test_id, 'apolloRPI').then(() => {
                  console.log('device added successfully');
               })
            }}
         />
         <Item
            header={ 'Remove Device' }
            func={() => {
               remove(state, test_id).then(() => {
                  console.log('device removed successfully');
               })
            }}
         />
         <Item
            header={ 'Fetch Status' }
            func={() => {
               status(state, test_id).then(response => {
                  console.log(response);
               })
            }}
         />
         <Item
            header={ 'Toggle Status' }
            func={() => {
               toggle(state, test_id).then(() => {
                  console.log('status toggled');
               })
            }}
         />
      </div>
   )
}

export default Devices;
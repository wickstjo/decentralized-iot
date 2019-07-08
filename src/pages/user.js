import React, { useContext, useState } from 'react';
import { Context } from '../context';
import '../interface/css/innerbody.scss';

import { fetch, add, remove } from '../funcs/user';
import Button from '../components/button';

function User() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      name: ''
   });

   // FETCH USER
   const Fetch = () => {
      fetch(state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // ADD USER
   const Add = () => {
      add(state, local.name).then(success => {
         if (success) {

            // LOG SUCCESS
            console.log('added user')

            // RESET NAME FIELD
            set_local({
               name: ''
            })
         }
      })
   }

   // REMOVE USER
   const Remove = () => {
      remove(state).then(success => {
         if (success) {
            console.log('removed user')
         }
      })
   }

   // UPDATE LOCAL STATE
   const update = (event) => {
      set_local({
         name: event.target.value
      })
   }
   
   return (
      <div id={ 'innerbody' }>
         <div>
            <Button
               header={ 'Fetch User' }
               func={ Fetch }
            />
            <Button
               header={ 'Add User' }
               func={ Add }
            />
            <Button
               header={ 'Remove User' }
               func={ Remove }
            />
         </div>
         <input
            type={ 'text' }
            placeholder={ 'Set a Name' }
            value={ local.name }
            onChange={ update }
         />
      </div>
   )
}

export default User;
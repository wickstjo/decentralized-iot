import React, { useContext, useState } from 'react';
import { Context } from '../context';
import '../interface/css/innerbody.scss';

import { fetch, exists, add } from '../funcs/user';
import Button from '../components/button';

function User() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      name: '',
      address: ''
   });

   // UPDATE LOCAL STATE
   const update = (event) => {
      set_local({
         ...local,
         [event.target.id]: event.target.value
      })
   }

   // FETCH USER
   const Fetch = () => {
      fetch(state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   function Exists() {
      exists(local.address, state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   // ADD USER
   const Add = () => {
      add(local.name, state).then(success => {
         if (success) {
            console.log('added user')
         }
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
               header={ 'Exists' }
               func={ Exists }
            />
            <Button
               header={ 'Add User' }
               func={ Add }
            />
         </div>
         <input
            type={ 'text' }
            placeholder={ 'Set a Name' }
            value={ local.name }
            onChange={ update }
            id={ 'name' }
         />
         <input
            type={ 'text' }
            placeholder={ 'Check User Address' }
            value={ local.address }
            onChange={ update }
            id={ 'address' }
         />
      </div>
   )
}

export default User;
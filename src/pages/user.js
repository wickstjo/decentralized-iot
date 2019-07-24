import React, { useContext, useState } from 'react';
import { Context } from '../context';
import '../interface/css/innerbody.scss';

import { fetch, details, add } from '../funcs/user';
import Button from '../components/button';
import Addr from '../components/inputs/addr';

function User() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useState({
      name: {
         value: '',
         status: false
      },
      address: {
         value: '',
         status: false
      }
   });

   // UPDATE LOCAL STATE
   const update = (response, id) => {
      set_local({
         ...local,
         [id]: response
      })
   }

   // FETCH USER
   const Address = () => {
      fetch(state).then(({ success, data }) => {
         if (success) {
            console.log(data)
         }
      })
   }

   function Details() {
      details(state).then(({ success, data }) => {
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
               header={ 'Address' }
               func={ Address }
            />
            <Button
               header={ 'Details' }
               func={ Details }
            />
            <Button
               header={ 'Add User' }
               func={ Add }
            />
         </div>
         <Addr
            placeholder={ 'Nickname' }
            value={ local.name.value }
            update={ update }
            id={ 'name' }
         />
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
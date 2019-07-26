import React, { useContext, useState } from 'react';
import { Context } from '../context';
import { details, add } from '../funcs/user';
import { keys } from '../resources/settings.json';

import Button from '../components/button';
import Address from '../components/inputs/address';
import Text from '../components/inputs/text';

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
         value: keys.public,
         status: false
      }
   });

   // SET USER INPUT
   function update(response, id) {
      set_local({
         ...local,
         [id]: response
      })
   }

   // FETCH USER DETAILS
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
         <Text 
            placeholder={ 'What is your name?' }
            value={ local.name.value }
            range={[ 3, 15 ]}
            update={ update }
            id={ 'name' }
         />
         <Button
            header={ 'Add User' }
            func={ Add }
         />
         <Address
            placeholder={ 'Check address' }
            value={ local.address.value }
            update={ update }
            id={ 'address' }
         />
         <Button
            header={ 'Details' }
            func={ Details }
         />
      </div>
   )
}

export default User;
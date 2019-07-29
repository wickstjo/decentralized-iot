import React, { useContext, useReducer } from 'react';
import { Context } from '../context';
import { details, add } from '../funcs/user';
import { input as reducer } from '../funcs/reducers';
import { keys } from '../resources/settings.json';

import Button from '../components/inputs/button';
import Address from '../components/inputs/address';
import Text from '../components/inputs/text';

function User() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      name: {
         value: '',
         status: null
      },
      address: {
         value: keys.public,
         status: null
      }
   })

   // SET USER INPUT
   function update(response, id) {
      set_local({
         type: 'field',
         payload: {
            name: id,
            value: response
         }
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
   function Add() {
      add(local.name, state).then(success => {
         if (success) {
            console.log('added user')
         }
      })
   }
   
   return (
      <div id={ 'innerbody' }>
         <Button
            header={ 'Add User' }
            func={ Add }
            require={[ local.name.status ]}
         />
         <Button
            header={ 'Details' }
            func={ Details }
            require={[ local.address.status ]}
         />
         <Text 
            placeholder={ 'What is your name?' }
            value={ local.name.value }
            range={[ 3, 15 ]}
            update={ update }
            id={ 'name' }
         />
         <Address
            placeholder={ 'Check address' }
            value={ local.address.value }
            update={ update }
            id={ 'address' }
         />
      </div>
   )
}

export default User;
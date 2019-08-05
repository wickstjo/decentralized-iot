import React, { useContext, useReducer } from 'react';
import { Context } from '../context';
import { details, add } from '../funcs/user';
import reducer from '../states/input';
import { keys } from '../resources/settings.json';
import { assess } from '../funcs/blockchain';

import Button from '../components/inputs/button';
import Address from '../components/inputs/address';
import Text from '../components/inputs/text';

function User() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

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

   // ADD USER
   function Add() {
      add(local.name.value, state).then(result => {
         assess({
            msg: 'user added'
         }, result, dispatch)
      })
   }

   // FETCH USER DETAILS
   function Details() {
      details(local.address.value, state).then(result => {
         assess({
            msg: 'fetched successfully',
            func: (data) => {
               console.log(data)
            }
         }, result, dispatch)
      })
   }
   
   return (
      <div>
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
import React, { useContext, useReducer, useEffect, Fragment } from 'react';
import { Context } from '../context';
import reducer from '../states/input';

import { collection, details, add } from '../contracts/user';
import { keys } from '../resources/settings.json';
import { assess } from '../funcs/blockchain';

import List from '../components/list';
import Button from '../components/inputs/button';
import Address from '../components/inputs/address';
import Text from '../components/inputs/text';

function Users() {

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
      },
      collection: []
   })

   // FETCH ALL USERS
   useEffect(() => {
      collection(state).then(result => {
         if (result.success) {
            set_local({
               type: 'field',
               payload: {
                  name: 'collection',
                  value: result.data
               }
            })
         }
      })
   }, [])

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
         <List
            header={ 'Users' }
            error={ 'No registered users' }
            url={ 'http://localhost:3000/users/' }
            data={ local.collection }
         />
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

function Collection({ data }) {
   switch(data.length) {

      // NO USERS
      case 0: { return (
         <div>No registered users.</div>
      )}

      // NO USERS
      default: { return (
         <Fragment>
            <div>Users</div>
            { data.map((user, index) => 
               <div key={ index }>
                  <a href={ 'http://localhost:3000/users/' + user } target={ '_blank' } rel={ 'noopener noreferrer'}>{ user }</a>
               </div>
            )}
         </Fragment>
      )}
   }
}

export default Users;
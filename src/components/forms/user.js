import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../context';
import reducer from '../../states/input';

import { add } from '../../contracts/user';
import { assess } from '../../funcs/blockchain';

import Form from '../form';
import Text from '../inputs/text';
import Number from '../inputs/number';
import Button from '../inputs/button';

function User() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      name: {
         value: '',
         status: null
      },
      gas: {
         value: '',
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

   return (
      <Fragment>
         <Form header={ 'register' }>
         <Text 
               placeholder={ 'What is your name?' }
               value={ local.name.value }
               range={[ 3, 15 ]}
               update={ update }
               id={ 'name' }
            />
            <Number 
               placeholder={ 'How much Gas?' }
               value={ local.gas.value }
               range={[ 5000, 500000 ]}
               update={ update }
               id={ 'gas' }
            />
         </Form>
         <div style={{ textAlign: 'right' }}>
            <Button
               header={ 'Add User' }
               func={ Add }
               require={[
                  local.name.status,
                  local.gas.status
               ]}
            />
         </div>
      </Fragment>
   )
}

export default User;


import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../context';
import reducer from '../../states/input';

import { add_user } from '../../contracts/user';
import { assess } from '../../funcs/blockchain';

import Form from '../form';
import Text from '../inputs/text';
import Button from '../inputs/button';

function User() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      name: {
         value: '',
         status: null
      }
   })

   // ADD USER
   function add() {
      add_user(local.name.value, state).then(result => {
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
               update={ set_local }
               id={ 'name' }
            />
         </Form>
         <div style={{ textAlign: 'right' }}>
            <Button
               header={ 'Add User' }
               func={ add }
               require={[ local.name.status ]}
            />
         </div>
      </Fragment>
   )
}

export default User;


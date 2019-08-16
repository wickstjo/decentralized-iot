import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../context';
import reducer from '../../states/input';

import { fetch, check } from '../../contracts/user';
import { assess } from '../../funcs/blockchain';

import Form from '../form';
import Address from '../inputs/address';
import Button from '../inputs/button';

function Result({ user }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      task: {
         value: '',
         status: null
      }
   })

   // ADD USER
   function Query() {

      // FETCH USER CONTRACT
      fetch(user, state).then(result => {
         assess({
            next: (location) => {

               // CHECK TASK RESULT
               check(local.task.value, location, state).then(result => {
                  assess({
                     msg: 'response found: ' + result.data
                  }, result, dispatch)
               })
            }
         }, result, dispatch)
      })
   }

   return (
      <Fragment>
         <Form header={ 'Task Response' }>
            <Address 
               placeholder={ 'Task Address' }
               value={ local.task.value }
               update={ set_local }
               id={ 'task' }
            />
         </Form>
         <div style={{ textAlign: 'right' }}>
            <Button
               header={ 'Query' }
               func={ Query }
               require={[ local.task.status ]}
            />
         </div>
      </Fragment>
   )
}

export default Result;


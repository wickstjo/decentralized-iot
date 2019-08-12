import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../context';
import reducer from '../../states/input';

import { init as init_tasks } from '../../contracts/task';
import { init as init_token } from '../../contracts/token';
import { init as init_devices } from '../../contracts/device';
import { assess } from '../../funcs/blockchain';
import latest from '../../resources/latest.json';

import Form from '../form';
import Button from '../inputs/button';
import Address from '../inputs/address';
import Number from '../inputs/number';

function Initialize() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      price: {
         value: '',
         status: null
      },
      tasks: {
         value: latest.tasks.address,
         status: null
      },
      devices: {
         value: latest.devices.address,
         status: null
      },
      users: {
         value: latest.users.address,
         status: null
      },
      token: {
         value: latest.token.address,
         status: null
      }
   })

   // INITIALIZE ALL
   function run() {

      // INITIATE TOKENS
      init_token(local.price.value, local.tasks.value, state).then(result => {
         assess({
            msg: 'token contract initiated'
         }, result, dispatch)

         // INITIATE TASKS
         init_tasks(local.devices.value, local.users.value, local.token.value, state).then(result => {
            assess({
               msg: 'tasks contract initiated'
            }, result, dispatch)

            // INITIATE DEVICES
            init_devices(local.users.value, state).then(result => {
               assess({
                  msg: 'devices contract initiated'
               }, result, dispatch)
            })
         })
      })
   }

   return (
      <Fragment>
         <Form header={ 'initialize contracts' }>
            <Number
               placeholder={ 'Token Price' }
               value={ local.price.value }
               range={[ 1000, 100000 ]}
               update={ set_local }
               id={ 'price' }
            />
            <Address
               placeholder={ 'Tasks Contract' }
               value={ local.tasks.value }
               update={ set_local }
               id={ 'tasks' }
            />
            <Address
               placeholder={ 'Devices Contract' }
               value={ local.devices.value }
               update={ set_local }
               id={ 'devices' }
            />
            <Address
               placeholder={ 'Users Contract' }
               value={ local.users.value }
               update={ set_local }
               id={ 'users' }
            />
            <Address
               placeholder={ 'Token Contract' }
               value={ local.token.value }
               update={ set_local }
               id={ 'token' }
            />
         </Form>
         <div style={{ textAlign: 'right' }}>
            <Button
               header={ 'Initialize All' }
               func={ run }
               require={[
                  local.price.status,
                  local.tasks.status,
                  local.devices.status,
                  local.users.status,
                  local.token.status
               ]}
            />
         </div>
      </Fragment>
   )
}

export default Initialize;


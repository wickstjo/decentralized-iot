import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../context';
import reducer from '../../states/input';

import { init as init_user_manager } from '../../contracts/user';
import { init as init_device_manager } from '../../contracts/device';
import { init as init_task_manager } from '../../contracts/task';
import { init as init_token_manager } from '../../contracts/token';

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
      user_manager: {
         value: latest.usermanager.address,
         status: null
      },
      device_manager: {
         value: latest.devicemanager.address,
         status: null
      },
      task_manager: {
         value: latest.taskmanager.address,
         status: null
      },
      token_manager: {
         value: latest.tokenmanager.address,
         status: null
      },
      token_price: {
         value: '',
         status: null
      },
   })

   // INITIALIZE ALL
   function run() {

      // INITIATE TOKEN MANAGER
      init_token_manager(local.token_price.value, local.task_manager.value, state).then(result => {
         assess({
            msg: 'token manager initiated'
         }, result, dispatch)

         // INITIATE TASK MANAGER
         init_task_manager(local.user_manager.value, local.device_manager.value, local.token_manager.value, state).then(result => {
            assess({
               msg: 'task manager initiated'
            }, result, dispatch)

            // INITIATE DEVICE MANAGER
            init_device_manager(local.user_manager.value, local.task_manager.value, state).then(result => {
               assess({
                  msg: 'device manager initiated'
               }, result, dispatch)

               // INITIATE USER MANAGER
               init_user_manager(local.task_manager.value, state).then(result => {
                  assess({
                     msg: 'user manager initiated'
                  }, result, dispatch)
               })
            })
         })
      })
   }

   return (
      <Fragment>
         <Form header={ 'initialize contracts' }>
            <Number
               placeholder={ 'Token Price' }
               value={ local.token_price.value }
               range={[ 1000, 100000 ]}
               update={ set_local }
               id={ 'token_price' }
            />
            <Address
               placeholder={ 'Task Manager' }
               value={ local.task_manager.value }
               update={ set_local }
               id={ 'task_manager' }
            />
            <Address
               placeholder={ 'Device Manager' }
               value={ local.device_manager.value }
               update={ set_local }
               id={ 'device_manager' }
            />
            <Address
               placeholder={ 'User Manager' }
               value={ local.user_manager.value }
               update={ set_local }
               id={ 'user_manager' }
            />
            <Address
               placeholder={ 'Token Manager' }
               value={ local.token_manager.value }
               update={ set_local }
               id={ 'token_manager' }
            />
         </Form>
         <div style={{ textAlign: 'right' }}>
            <Button
               header={ 'Initialize All' }
               func={ run }
               require={[
                  local.token_price.status,
                  local.task_manager.status,
                  local.device_manager.status,
                  local.user_manager.status,
                  local.token_manager.status
               ]}
            />
         </div>
      </Fragment>
   )
}

export default Initialize;


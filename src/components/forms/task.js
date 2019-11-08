import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../context';
import reducer from '../../states/input';

import { add } from '../../contracts/task';
import { assess } from '../../funcs/blockchain';

import Form from '../form';
import Button from '../inputs/button';
import Text from '../inputs/text';
import Number from '../inputs/number';

function Task() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      name: {
         value: '',
         status: null
      },
      reputation: {
         value: '',
         status: null
      },
      key: {
         value: '',
         status: null
      },
      reward: {
         value: '',
         status: null
      }
   })

   // ADD TASK
   function Add() {
      add({
         name: local.name.value,
         reputation: local.reputation.value,
         reward: local.reward.value,
         key: local.key.value
      }, state).then(result => {
         assess({
            msg: 'task posted successfully'
         }, result, dispatch)
      })
   }

   return (
      <Fragment>
         <Form header={ 'create task' }>
            <Text
               placeholder={ 'Task Name' }
               value={ local.name.value }
               range={[ 5, 30 ]}
               update={ set_local }
               id={ 'name' }
            />
            <Number
               placeholder={ 'Minimum Reputation' }
               value={ local.reputation.value }
               range={[ 1, 10 ]}
               update={ set_local }
               id={ 'reputation' }
            />
            <Text
               placeholder={ 'Public Encryption Key' }
               value={ local.key.value }
               range={[ 5, 20 ]}
               update={ set_local }
               id={ 'key' }
            />
            <Number
               placeholder={ 'Reward in Wei' }
               value={ local.reward.value }
               range={[ 1000, 100000 ]}
               update={ set_local }
               id={ 'reward' }
            />
         </Form>
         <div style={{ textAlign: 'right' }}>
            <Button
               header={ 'Create' }
               func={ Add }
               require={[
                  local.name.status,
                  local.reputation.status,
                  local.key.status,
                  local.reward.status
               ]}
            />
         </div>
      </Fragment>
   )
}

export default Task;


import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../context';
import reducer from '../../states/input';

import { add_task } from '../../contracts/task';
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
      encryption: {
         value: '',
         status: null
      },
      reward: {
         value: '',
         status: null
      }
   })

   // ADD TASK
   function add() {
      add_task({
         name: local.name.value,
         reputation: local.reputation.value,
         reward: local.reward.value,
         encryption: local.encryption.value
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
               value={ local.encryption.value }
               range={[ 5, 20 ]}
               update={ set_local }
               id={ 'encryption' }
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
               func={ add }
               require={[
                  local.name.status,
                  local.reputation.status,
                  local.encryption.status,
                  local.reward.status
               ]}
            />
         </div>
      </Fragment>
   )
}

export default Task;


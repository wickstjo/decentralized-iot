import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../context';
import reducer from '../../states/input';

import { accept } from '../../contracts/task';
import { assess } from '../../funcs/blockchain';

import Form from '../form';
import Button from '../inputs/button';
import Text from '../inputs/text';

function Accept({ task }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      device: {
         value: '',
         status: null
      }
   })

   // ACCEPT TASK
   function Accept() {
      accept(task, local.device.value, state).then(result => {
         assess({
            msg: 'task assigned'
         }, result, dispatch)
      })
   }

   return (
      <Fragment>
         <Form header={ 'accept task' }>
            <Text
               placeholder={ 'Performing Device' }
               value={ local.device.value }
               range={[ 64, 64 ]}
               update={ set_local }
               id={ 'device' }
            />
         </Form>
         <div style={{ textAlign: 'right' }}>
            <Button
               header={ 'Accept' }
               func={ Accept }
               require={[ local.device.status ]}
            />
         </div>
      </Fragment>
   )
}

export default Accept;


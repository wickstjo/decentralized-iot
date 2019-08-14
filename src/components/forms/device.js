import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../context';
import reducer from '../../states/input';

import { add } from '../../contracts/device';
import { assess } from '../../funcs/blockchain';

import Form from '../form';
import Button from '../inputs/button';
import Text from '../inputs/text';

function Device() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      name: {
         value: '',
         status: null
      },
      hash: {
         value: 'cdbde0df13a59633a2a55ee9342d9b31650ae27c0a3c0d80bab4b1561f4df16e',
         status: null
      }
   })

   // ADD DEVICE
   function Add() {
      add(local.hash.value, local.name.value, state).then(result => {
         assess({
            msg: 'device added successful'
         }, result, dispatch)
      })
   }

   return (
      <Fragment>
         <Form header={ 'register device' }>
            <Text
               placeholder={ 'Device Nickname' }
               value={ local.name.value }
               range={[ 3, 15 ]}
               update={ set_local }
               id={ 'name' }
            />
            <Text
               placeholder={ 'Device Hash' }
               value={ local.hash.value }
               range={[ 64, 64 ]}
               update={ set_local }
               id={ 'hash' }
            />
         </Form>
         <div style={{ textAlign: 'right' }}>
            <Button
               header={ 'Add' }
               func={ Add }
               require={[ local.hash.status ]}
            />
         </div>
      </Fragment>
   )
}

export default Device;


import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../context';
import reducer from '../../states/input';

import { buy_token, transfer_token } from '../../contracts/token';
import { assess } from '../../funcs/blockchain';

import Form from '../form';
import Number from '../inputs/number';
import Address from '../inputs/address';
import Button from '../inputs/button';

function Token() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      amount: {
         value: '',
         status: null
      },
      recipient: {
         value: '',
         status: null
      }
   })

   // CHECK CURRENT TOKEN STATUS
   function buy() {
      buy_token(local.amount.value, state).then(result => {
         assess({
            msg: 'purchase successful'
         }, result, dispatch)
      })
   }

   // CHECK CURRENT TOKEN STATUS
   function transfer() {
      transfer_token(local.amount.value, local.recipient.value, state).then(result => {
         assess({
            msg: 'transfer successful'
         }, result, dispatch)
      })
   }

   return (
      <Fragment>
         <Form header={ 'buy and transfer' }>
            <Number
               placeholder={ 'Amount of tokens' }
               value={ local.amount.value }
               range={[ 1, 100 ]}
               update={ set_local }
               id={ 'amount' }
            />
            <Address
               placeholder={ 'recipients Address' }
               value={ local.recipient.value }
               update={ set_local }
               id={ 'recipient' }
            />
         </Form>
         <div style={{ textAlign: 'right' }}>
            <Button
               header={ 'Buy' }
               func={ buy }
               require={[ local.amount.status ]}
            />
            <Button
               header={ 'Transfer' }
               func={ transfer }
               require={[
                  local.amount.status,
                  local.recipient.status
               ]}
            />
         </div>
      </Fragment>
   )
}

export default Token;


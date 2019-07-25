import React, { useState } from 'react';

import Address from '../components/inputs/address';
import Number from '../components/inputs/number';
import Text from '../components/inputs/text';

function Testing() {

   // LOCAL STATE
   const [local, set_local] = useState({
      address: {
         value: '',
         status: false
      },
      number: {
         value: '',
         status: false
      },
      text: {
         value: '',
         status: false
      }
   });

   // SET USER INPUT
   const update = (response, id) => {
      set_local({
         ...local,
         [id]: response
      })
   }

   return (
      <div id={ 'innerbody' }>
         <Address
            placeholder={ 'Give an Address' }
            value={ local.address.value }
            update={ update }
            id={ 'address' }
         />
         <Number
            placeholder={ 'Give a Number' }
            value={ local.number.value }
            range={[ 1, 10 ]}
            update={ update }
            id={ 'number' }
         />
         <Text
            placeholder={ 'Write some text' }
            value={ local.text.value }
            range={[ 5, 20 ]}
            update={ update }
            id={ 'text' }
         />
      </div>
   )
}

export default Testing;
import React from 'react';

import { shorten } from '../funcs/misc';
import { fetch_result } from '../contracts/user';

import Box from './box';

function Inspector({ header, error, data, state, user }) { return (
   <Box header={ header }>
      <Items
         data={ data }
         error={ error }
         state={ state }
         user={ user }
      />
   </Box>
)}

function show(task, user, state) {
   fetch_result(task, user, state).then(result => {
      console.log(result)
   })
}

function Items({ data, error, state, user }) {
   switch(data.length) {

      // NO ITEMS
      case 0: { return (
         <div className={ 'row' }>{ error }</div>
      )}

      // OTHERWISE
      default: { return (
         <div>
            { data.map((item, index) =>
               <div className={ 'row' } key={ index } onClick={() => { show(item, user, state) }}>
                  { shorten(item) }
               </div>
            )}
         </div>
      )}
   }
}

export default Inspector;
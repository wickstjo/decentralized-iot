import React, { useContext } from 'react';
import { Context } from '../context';

import { shorten } from '../funcs/misc';
import Box from './box';

function Inspector({ data, header, error }) {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // OPEN PROMPT
   function open(item) {
      dispatch({
         type: 'show-prompt',
         payload: {
            type: 'ipfs',
            param: item
         }
      })
   }

   // DETERMINE RENDER
   switch (data.length) {

      // NO RESPONSES
      case 0: { return (
         <Box header={ header }>
            <div className={ 'row' }>{ error }</div>
         </Box>
      )}

      // LIST ALL
      default: { return (
         <Box header={ header }>
            { data.map((item, index) =>
               <div className={ 'row' } key={ index }>
                  <div onClick={() => { open(item) }}>{ shorten(item.ipfs) }</div>
               </div>
            )}
         </Box>
      )}
   }
}

export default Inspector;
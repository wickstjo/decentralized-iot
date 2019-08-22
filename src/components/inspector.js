import React from 'react';

import { shorten } from '../funcs/misc';
import Box from './box';

function Inspector({ data, header, error }) {
   switch (data.length) {

      case 0: { return (
         <Box header={ header }>
            <div className={ 'row' }>{ error }</div>
         </Box>
      )}

      default: { return (
         <Box header={ header }>
            { data.map((item, index) => 
               <div className={ 'row' } id={ 'split' } key={ index }>
                  <div>{ item.name }:</div>
                  <div>{ shorten(item.ipfs) }</div>
               </div>
            )}
         </Box>
      )}
   }
}

export default Inspector;
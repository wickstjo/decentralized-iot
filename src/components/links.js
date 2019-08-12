import React from 'react';

import { shorten } from '../funcs/misc';
import Box from './box';

function Links({ header, error, data, url }) { return (
   <Box header={ header }>
      <Items
         data={ data }
         error={ error }
         url={ url }
      />
   </Box>
)}

function Items({ data, error, url }) {
   switch(data.length) {

      // NO ITEMS
      case 0: { return (
         <div className={ 'row' }>{ error }</div>
      )}

      // OTHERWISE
      default: { return (
         <div>
            { data.map((item, index) =>
               <div className={ 'row' } key={ index }>
                  <a href={ url + item } target={ '_blank' } rel={ 'noopener noreferrer' }>{ shorten(item) }</a>
               </div>
            )}
         </div>
      )}
   }
}

export default Links;
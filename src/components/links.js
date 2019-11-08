import React from 'react';
import { Link } from 'react-router-dom';

import { shorten } from '../funcs/misc';
import Box from './box';

function Links({ header, error, data, section }) { return (
   <Box header={ header }>
      <Items
         data={ data }
         error={ error }
         section={ section }
      />
   </Box>
)}

function Items({ data, error, section }) {
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
                  <Link to={ section + '/' +  item }>{ shorten(item) }</Link>
               </div>
            )}
         </div>
      )}
   }
}

export default Links;
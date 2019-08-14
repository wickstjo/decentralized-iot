import React, { useState, useEffect } from 'react';

import { shorten } from '../funcs/misc';
import Box from './box';

function List({ data, header }) {

   // LOCAL STATE
   const [keys, set_keys] = useState([]);

   // ON LOAD, FISH OUT KEYS
   useEffect(() => {
      set_keys(Object.keys(data))
   }, [])

   return (
      <Box header={ header }>
         { keys.map((key, index) => 
            <div className={ 'row' } id={ 'split' } key={ index }>
               <div>{ key }:</div>
               <div>{ shorten(data[key]) }</div>
            </div>
         )}
      </Box>
   )
}

export default List;
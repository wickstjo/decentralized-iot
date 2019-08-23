import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../context';
import { fetch } from '../../funcs/ipfs';

function Ipfs() {

   // STATES
   const { state } = useContext(Context);
   const [ url, set_url ] = useState(null);
   const [ dimensions ] = useState({
      width: 3280 * 0.18,
      height: 2464 * 0.18
   })

   // GENERATE IMAGE BLOB
   useEffect(() => {
      fetch(state.prompt.content.param.ipfs, state).then(result => {
         
         const blob = new Blob([result.data], { 'type': 'image/png' });
         const url = URL.createObjectURL(blob);

         set_url(url);
      })
   }, [])
 
   switch(url) {

      case null: { return (
         <div>
            Loading
         </div>
      )}

      default: { return (
         <div>
            <img src={ url } height={ dimensions.height } width={ dimensions.width } alt={ 'foo' } />
         </div>
      )}
   }
}

export default Ipfs;
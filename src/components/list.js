import React, { Fragment } from 'react';

function List({ header, error, data, url }) { return (
   <Fragment>
      <div>{ header }</div>
      <Items
         data={ data }
         error={ error }
         url={ url }
      />
   </Fragment>
)}

function Items({ data, error, url }) {
   switch(data.length) {

      // NO ITEMS
      case 0: { return (
         <div>{ error }</div>
      )}

      // OTHERWISE
      default: { return (
         <div>
            { data.map((item, index) =>
               <div key={ index }>
                  <a href={ url + item } target={ '_blank' } rel={ 'noopener noreferrer' }>{ item }</a>
               </div>
            )}
         </div>
      )}
   }
}

export default List;
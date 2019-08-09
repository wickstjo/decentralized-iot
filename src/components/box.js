import React from 'react';

function Box({ header, children }) { return (
   <div className={ 'box' }>
      <div id={ 'header' }>{ header }</div>
      <div id={ 'content' }>
         { children }
      </div>
   </div>
)}

export default Box;
import React from 'react';

function Error({ reason }) { return (
   <div>
      <div id={ 'error' }>
         <div id={ 'header' }>Something went wrong</div>
         <div id={ 'content' }>{ reason }</div>
      </div>
   </div>
)}

export default Error;
import React from 'react';

function Form({ header, children }) { return (
   <div className={ 'box' } style={{ paddingBottom: '0px' }}>
      <div id={ 'form-header' }>{ header }</div>
      <div id={ 'content' }>
         { children }
      </div>
   </div>
)}

export default Form;
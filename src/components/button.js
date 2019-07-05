import React from 'react';

function Button({ header, func }) { return (
    <span className={ 'button' } onClick={ func }>
        { header }
    </span>
)}

export default Button;
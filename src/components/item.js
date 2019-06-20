import React from 'react';

function Item({ header, func }) { return (
    <span className={ 'item' } onClick={ func }>
        { header }
    </span>
)}

export default Item;
import React from 'react';
import { Link } from 'react-router-dom';

function Item({ header, to }) { return (
   <Link to={ to } className={ 'item' }>{ header }</Link>
)}

export default Item;
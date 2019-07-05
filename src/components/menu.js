import React from 'react';
import { Link } from 'react-router-dom';
import '../interface/css/menu.scss';

function Menu() { return (
   <div id={ 'menu' }>
      <Item
         to={ '/user' }
         header={ 'User' }
      />
      <Item
         to={ '/licence' }
         header={ 'Licence' }
      />
      <Item
         to={ '/device' }
         header={ 'Device' }
      />
      <Item
         to={ '/task' }
         header={ 'Task' }
      />
   </div>
)}

// MENU ITEM
function Item({ header, to }) { return (
   <Link to={ to } className={ 'item' }>{ header }</Link>
)}

export default Menu;
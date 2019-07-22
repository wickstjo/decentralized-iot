import React from 'react';
import '../interface/css/menu.scss';

import Item from './menu/item';

function Menu() { return (
   <div id={ 'menu' }>
      <div>
         <Item
            to={ '/user' }
            header={ 'User' }
         />
         <Item
            to={ '/tokens' }
            header={ 'Tokens' }
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
      <div>
         <Item
            to={ '/initialize' }
            header={ 'Initialize' }
         />
      </div>
   </div>
)}

export default Menu;
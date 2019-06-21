import React, { useContext } from 'react';
import { Context } from '../context';
import { network } from '../resources/settings.json';

import Users from '../components/users';
import Licences from '../components/licences';
import Devices from '../components/devices';

function Home() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // RENDER BUTTONS IF USER IS ON THE CORRECT NETWORK
   if (state.metamask.network === network) { return (

      <div id={ 'innerbody' }>
         <Users />
         <Licences />
         <Devices />
      </div>

   // OTHERWISE, SHOW ERROR MESSAGE
   )} else { return <div>You are on the wrong network!</div> }
}

export default Home;
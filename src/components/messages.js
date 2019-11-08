import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../context";
import '../interface/css/messages.scss';
import { sleep } from "../funcs/misc";

function Messages() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   return (
      <div id={ 'messages' }>
         { state.messages.map((item, index) =>
            <Message
               item={ item }
               id={ index }
               key={ index }
            />
         )}
      </div>
   )
}

function Message({ item }) {

   // LOCAL STYLE
   const [style, set_style] = useState({})

   // FADE IN AND OUT
   useEffect(() => {

      // GRADUALLY TURN ON OPACITY
      set_style({
         ...style,
         opacity: '1'
      })

      // WAIT 3 SECONDS
      sleep(5000).then(() => {

         // GRADUALLY TURN OFF OPACITY
         set_style({
            ...style,
            opacity: '0'
         })

         // WAIT FOR THE FADE TO END
         sleep(200).then(() => {

            // SHUT THE COMPONENT DOWN PROPERLY
            set_style({
               ...style,
               display: 'none'
            })

         })
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'message' } className={ item.type } style={ style }>
         { item.text }
      </div>
   )
}

export default Messages;
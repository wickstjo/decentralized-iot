import React, { useContext, useReducer, useEffect } from 'react';
import { Context } from '../context';
import { values, reducer } from '../states/prompt';

import '../interface/css/prompt.scss';
import { sleep } from '../funcs/misc';

function Prompt() {

    // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

    // LOCAL STYLE
    const [style, set_style] = useReducer(reducer, values);

    // TOGGLE VISIBILITY BASED ON STATE
    useEffect(() => {
        if (state.prompt.show) {

            // SET DISPLAY TO FLEX
            set_style({
                type: 'display',
                payload: 'flex'
            })

            // WAIT 100 MS
            sleep(100).then(() => {

                // GRADUALLY TURN OPACITY ON
                set_style({
                    type: 'opacity',
                    payload: 1
                })
            })
        } else {

            // GRADUALLY TURN OPACITY OFF
            set_style({
                type: 'opacity',
                payload: 0
            })
            
            // SET DISPLAY TO NONE
            sleep(100).then(() => {
                set_style({
                    type: 'display',
                    payload: 'none'
                })
            })
        }
    }, [state.prompt.show]);

    // CLOSE PROMPT WINDOW
    function close() {
        dispatch({
            type: 'close-prompt'
        })
    }
    
    return (
        <div id={ 'prompt' } style={ style }>
            <div id={ 'inner' }>
                foobar
            </div>
            <span
                id={ 'close' }
                onClick={ close }
            />
        </div>
    )
}

export default Prompt;
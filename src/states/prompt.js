// DEFAULT VALUES
const values = {
    opacity: 0,
    display: 'none'
}

// FUNCTION TYPES
function reducer(state, { type, payload }) {
    switch (type) {
        
        // MODIFY DISPLAY
        case 'display': { return {
            ...state,
            display: payload
        }}

        // MODIFY OPACITY
        case 'opacity': { return {
            ...state,
            opacity: payload
        }}

        default: {
            return state;
        }
    }
}

export {
    values,
    reducer
}
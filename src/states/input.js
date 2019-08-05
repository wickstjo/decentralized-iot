function input(local, action) {
   switch (action.type) {

      // UPDATE NAME
      case 'field': {
         return {
            ...local,
            [action.payload.name]: action.payload.value
         }
      }

      // FALLBACK
      default: {
         return local;
      }
   }
}

export default input;
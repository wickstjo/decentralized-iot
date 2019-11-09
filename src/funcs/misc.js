function shorten(string) {

   const max_length = 35;
   const cutoff = 15;
   
   // IF MAX LENGTH IS EXCEEDED
   if (string.length > max_length) {

      // ALLOW THE FIRST 20 CHARACTERS AND TAG ON THE TRIPLEDOT
      string = string.substring(0, cutoff) + '...' + string.substring(string.length - cutoff, string.length);
   }

   return string;
}

// CHECK IF ALL VALUES HAVE PASSED VALIDATION
function check_validation(values) {

   // IF VALUES WERE DEFINED
   if (values !== undefined) {

      // DEFAULT TO TRUE
      let response = true;

      // LOOP THROUGH VALUES
      for (let value of values) {
         if (value !== true) {

            // IF IT ISNT TRUE, SWITCH TO FALSE & STOP LOOPING
            response = false;
            break;
         }
      }

      // FINALLY RETURN RESULT
      return response;

   // OTHERWISE, AUTOMATICALLY RETURN TRUE
   } else { return true; }
}

// WAIT FOR GIVEN MILLISECONDS
function sleep (time) {
   return new Promise((resolve) => setTimeout(resolve, time));
}

// FILTER OUT DESTROYED CONTRACTS
function filter(tasks) {
   const container = [];

   // CREATE PROMISES
   tasks.forEach(task => {
       if (task !== '0x0000000000000000000000000000000000000000') {
           container.push(task);
       }
   })

   return container;
}

export {
   shorten,
   check_validation,
   sleep,
   filter
}
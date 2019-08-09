function shorten(string) {

   // MAX CHARACTER LIMIT
   const max_length = 35;
   
   // CHECK IF THE STRING IS LONGER THAN 22 CHARACTERS
   if (string.length > max_length) {

      // ALLOW THE FIRST 20 CHARACTERS AND TAG ON THE TRIPLEDOT
      string = string.substring(0, max_length) + '...';
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

export {
   shorten,
   check_validation,
   sleep
}
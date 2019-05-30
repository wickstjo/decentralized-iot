function shorten(string) {

   // MAX CHARACTER LIMIT
   const max_length = 10;
   
   // CHECK IF THE STRING IS LONGER THAN 22 CHARACTERS
   if (string.length > max_length) {

      // ALLOW THE FIRST 20 CHARACTERS AND TAG ON THE TRIPLEDOT
      string = string.substring(0, max_length);
   }

   return string;
}

export {
   shorten
}
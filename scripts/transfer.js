const fs = require("fs");

// READ CONTRACTS
fs.readFile("build/contracts/Main.json", "utf-8", (err, main) => {
   fs.readFile("build/contracts/Users.json", "utf-8", (err, users) => {
      fs.readFile("build/contracts/Devices.json", "utf-8", (err, devices) => {

         // PROCESS FILE CONTENTS
         main = process(main);
         users = process(users);
         devices = process(devices);

         // CONSTRUCT & STRINGIFY NEW REFS
         const refs = JSON.stringify({
            abi: main.abi,
            main: main.address,
            users: users.address,
            devices: devices.address
         });

         // REWRITE SETTINGS FILE
         fs.writeFile("src/resources/latest.json", refs, (err) => {
            if (err) console.log(err);
            console.log("Rewrote settings object!");
         });
      });
   });
});

// FETCH ADDRESS
function process(contents) {
   
   // CONVERT TEXT TO OBJECT
   const build = JSON.parse(contents);

   // RETURN ADDRESS & ABI
   return {
      address: Object.keys(build.networks).pop(),
      abi: build.abi
   };
}
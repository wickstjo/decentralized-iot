const fs = require("fs");

// READ CURRENT SETTINGS
fs.readFile("src/settings.json", "utf-8", (err, data) => {

   // SAVE IT
   const settings = JSON.parse(data);

   // READ THE RECENTLY COMPILED CONTRACT
   fs.readFile("build/contracts/Main.json", "utf-8", (err, data) => {

      // SAVE IT
      const build = JSON.parse(data);

      // FETCH ADDRESS
      const name = Object.keys(build.networks).pop();

      // OVERWRITE OLD SETTINGS ABI & ADDRESS
      settings.latest = {
         abi: build.abi,
         address: build.networks[name].address
      }

      // CONVERT SETTINGS OBJECT BACK TO A STRING
      const stringified =  JSON.stringify(settings);

      // OVERWRITE OLD SETTINGS
      fs.writeFile("src/settings.json", stringified, (err) => {
         if (err) console.log(err);
         console.log("Rewrote settings object!");
      });
   });
});
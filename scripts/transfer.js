const fs = require("fs");

// PLACEHOLDERS
const response = {};
const promises = [];

// SPECIFY FILES & RUN
run([
   'Devices',
   'Licences',
   'Tasks',
   'Tokens',
   'Users'
]);

// RUN THE TRANSFER
function run(files) {

   // GENERATE & PUSH A PROMISE FOR EACH FILE
   files.forEach(name => {
      promises.push(promisify(name));
   });

   // AFTER ALL FILES HAVE BEEN READ & PROCESSED
   Promise.all(promises).then(() => {
      
      // STRINGIFY THE FINISHED OBJECT
      const stringified = JSON.stringify(response);

      // THEN OVERWRITE THE REFS FILE
      fs.writeFile("src/resources/latest.json", stringified, (err) => {

         if (err) console.log(err);
         console.log("REWROTE REFERENCES JSON SUCCESSFULLY!");
      });
   });
}

// GENERATE FILE READING PROMISE
function promisify(name) {
   return new Promise((resolve, reject) => {

      // READ THE COMPILED BYTE FILE
      fs.readFile('build/contracts/' + name + '.json', "utf-8", (err, content) => {

         // FETCH THE ABI & ADDRESS, THEN PUSH IT
         response[name] = process(content);

         // THEN RESOLVE
         resolve()
      });
   })
}

// FETCH ADDRESS
function process(contents) {
   
   // CONVERT TEXT TO OBJECT
   const build = JSON.parse(contents);

   // FETCH NETWORK TIMESTAMP
   const id = Object.keys(build.networks).pop();

   // RETURN ADDRESS & ABI
   return {
      address: build.networks[id].address,
      abi: build.abi
   };
}
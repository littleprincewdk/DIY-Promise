const promisesAplusTests = require('promises-aplus-tests');
const adapter = require('./adapter');

promisesAplusTests(adapter, function(error) {
  // All done; output is in the console. Or check `err` for number of failures.
  console.log(error);
});

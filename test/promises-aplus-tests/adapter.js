const Promise = require('../../dist/index').default;

function resolved(value) {
  return new Promise(function(resolve) {
    resolve(value);
  });
}

function rejected(error) {
  return new Promise(function(resolve, reject) {
    reject(error);
  });
}
function deferred() {
  let resolve;
  let reject;
  return {
    promise: new Promise(function(rslv, rjct) {
      resolve = rslv;
      reject = rjct;
    }),
    resolve,
    reject,
  };
}

module.exports = {
  resolved,
  rejected,
  deferred,
};

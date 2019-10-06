import Promise from '../dist';

// const p = new Promise((resolve, reject) => {
//   setTimeout(reject, 0);
// });
// const p1 = p.catch(() => {
//   console.log('catch');
// });

// p1.then(() => {
//   console.log('p1.then');
// });

// Promise.resolve('Promise.resolve').then(str => console.log(str));
// // eslint-disable-next-line prefer-promise-reject-errors
// Promise.reject('Promise.reject').catch(str => console.log(str));

Promise.resolve(1)
  .then(a => {
    console.log(a);
    return 2;
  })
  .then(a => {
    console.log(a);
  });

// Promise.all([
//   Promise.resolve(1),
//   Promise.reject(new Error(3)),
//   Promise.resolve(2),
// ])
//   .then(values => {
//     console.log('Promise.all', values);
//   })
//   .catch(e => {
//     console.log('e', e);
//   });

// Promise.race([
//   new Promise(resolve => setTimeout(() => resolve(1), 200)),
//   new Promise(resolve => setTimeout(() => resolve(2), 100)),
//   Promise.reject(new Error(3)),
//   Promise.resolve(3),
// ])
//   .then(values => {
//     console.log('Promise.race', values);
//   })
//   .catch(e => {
//     console.log('e', e);
//   });

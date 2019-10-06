import Promise, { Status } from '../promise';
import { noopFunc } from '../utils';

export default function all(promises: Promise[]): Promise {
  const next = new Promise(noopFunc);
  const values = [];
  const len = promises.length;
  let fulfilledCount = 0;

  for (let i = 0; i < len; i += 1) {
    const promise = promises[i];
    if (promise._status === Status.Rejected) {
      next._reject(promise._value);
      break;
    } else if (promise._status === Status.Fulfilled) {
      values[i] = promise._value;
      fulfilledCount += 1;
      if (fulfilledCount === len) {
        next._resolve(values);
      }
    } else {
      promise
        // eslint-disable-next-line no-loop-func
        .then((value: any): any => {
          if (next._status === Status.Pending) {
            values[i] = promise._value;
            fulfilledCount += 1;
            if (fulfilledCount === len) {
              next._resolve(values);
            }
          }
          return value;
        })
        .catch(
          (error: Error): Promise => {
            if (next._status === Status.Pending) {
              next._reject(promise._value);
            }
            return Promise.reject(error);
          }
        );
    }
  }

  return next;
}

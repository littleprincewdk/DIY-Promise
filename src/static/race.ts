import Promise, { Status } from '../promise';
import { noopFunc } from '../utils';

export default function race(promises: Promise[]): Promise {
  const next = new Promise(noopFunc);
  const len = promises.length;

  for (let i = 0; i < len; i += 1) {
    const promise = promises[i];
    if (promise._status === Status.Rejected) {
      next._reject(promise._value);
      break;
    } else if (promise._status === Status.Fulfilled) {
      next._resolve(promise._value);
      break;
    } else {
      promise
        .then((value: any): any => {
          if (next._status === Status.Pending) {
            next._resolve(promise._value);
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

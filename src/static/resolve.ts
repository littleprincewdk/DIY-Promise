import Promise from '../promise';
import { isPromise, thenable } from '../utils';

export default function resolve(x: any): Promise {
  if (isPromise(x)) {
    return x;
  }

  if (thenable(x)) {
    return new Promise(x.then);
  }

  return new Promise(function callback(rsl): void {
    return rsl(x);
  });
}

import Promise from '../promise';

export default function reject(error: any): Promise {
  return new Promise(function callback(_, rjt): void {
    return rjt(error);
  });
}

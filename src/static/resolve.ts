import Promise from '../promise';

export default function resolve(value: any): Promise {
  return new Promise(function callback(rsl): void {
    return rsl(value);
  });
}

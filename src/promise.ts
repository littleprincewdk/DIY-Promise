import { noopFunc, nextTick } from './utils';
import resolve from './static/resolve';
import reject from './static/reject';
import all from './static/all';
import race from './static/race';

export enum Status {
  Pending,
  Fulfilled,
  Rejected,
}

class Promise {
  static resolve = resolve;

  static reject = reject;

  static all = all;

  static race = race;

  _status: Status = Status.Pending;

  _value: any;

  _onFulfilled: Function;

  _onRejected: Function;

  _next: Promise;

  _tick: boolean = false;

  constructor(callback: (resolve, reject?) => void) {
    callback(this._resolve, this._reject);
  }

  then(onFulfilled, onRejected?) {
    if (typeof onFulfilled === 'function') {
      this._onFulfilled = onFulfilled;
    }
    if (typeof onRejected === 'function') {
      this._onRejected = onRejected;
    }

    if (this._status === Status.Fulfilled) {
      !this._tick && this._resolve(this._value);
    } else if (this._status === Status.Rejected) {
      !this._tick && this._reject(this._value);
    }

    this._next = new Promise(noopFunc);

    return this._next;
  }

  catch(onRejected: (error: any) => void) {
    if (typeof onRejected === 'function') {
      this._onRejected = onRejected;
    }
    if (this._status === Status.Rejected) {
      this._reject(this._value);
    }

    this._next = new Promise(noopFunc);

    return this._next;
  }

  _resolve = value => {
    this._status = Status.Fulfilled;
    this._value = value;
    nextTick(() => {
      let nextValue;
      if (this._onFulfilled) {
        nextValue = this._onFulfilled.call(null, value);
      }
      if (this._next) {
        this._next._resolve(nextValue);
      }
      this._tick = false;
    });
    this._tick = true;
  };

  _reject = error => {
    this._status = Status.Rejected;
    this._value = error;
    nextTick(() => {
      if (this._onRejected) {
        this._onRejected.call(null, error);
        if (this._next) {
          this._next._resolve(this._next._value);
        }
      } else if (this._next) {
        this._next._reject(error);
      }
      this._tick = false;
    });
    this._tick = true;
  };
}

export default Promise;
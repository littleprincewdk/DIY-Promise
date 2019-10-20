import resolve from './static/resolve';
import reject from './static/reject';
import all from './static/all';
import race from './static/race';
import { noopFunc, isFunction, nextTick, PROMISE_ID, nextId } from './utils';

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
    this[PROMISE_ID] = nextId();
    callback(this._resolve, this._reject);
  }

  then(onFulfilled, onRejected?) {
    if (isFunction(onFulfilled)) {
      this._onFulfilled = onFulfilled;
    }
    if (isFunction(onRejected)) {
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
    if (isFunction(onRejected)) {
      this._onRejected = onRejected;
    }
    if (this._status === Status.Rejected) {
      this._reject(this._value);
    }

    this._next = new Promise(noopFunc);

    return this._next;
  }

  _resolve = (value: any): void => {
    // SPEC: 2.1.2.1: When fulfilled, a promise:
    // must not transition to any other state.
    if (this._status !== Status.Pending) {
      return;
    }

    this._status = Status.Fulfilled;
    this._value = value;
    nextTick(() => {
      let nextValue;
      if (this._onFulfilled) {
        // SPEC: 2.2.5 `onFulfilled` and `onRejected`
        // must be called as functions (i.e. with no `this` value).
        const onFulfilled = this._onFulfilled;
        nextValue = onFulfilled(value);
      }
      if (this._next) {
        this._next._resolve(nextValue);
      }
      this._tick = false;
    });
    this._tick = true;
  };

  _reject = (error: any): void => {
    // SPEC: 2.1.3.1: When rejected, a promise:
    // must not transition to any other state.
    if (this._status !== Status.Pending) {
      return;
    }

    this._status = Status.Rejected;
    this._value = error;
    nextTick(() => {
      if (this._onRejected) {
        // SPEC: 2.2.5 `onFulfilled` and `onRejected`
        // must be called as functions (i.e. with no `this` value).
        const onRejected = this._onRejected;
        onRejected(null, error);
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

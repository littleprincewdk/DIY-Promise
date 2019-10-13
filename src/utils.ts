export function noopFunc(): void {}

export function isObject(x: any): boolean {
  return typeof x === 'object';
}

export function isFunction(x: any): boolean {
  return typeof x === 'function';
}

interface Observer {
  new (callback: MutationCallback): MutationObserver;
  prototype: MutationObserver;
}

function byObserver(Observer: Observer): Function {
  const node = document.createTextNode('');
  const queue = [];
  let i = 0;

  new Observer(function cb(): void {
    let callback: () => void;
    const currentQueue = [...queue];
    queue.length = 0;
    callback = currentQueue.shift();
    while (callback) {
      callback();
      callback = currentQueue.shift();
    }
  }).observe(node, { characterData: true });

  return function nextTick(callback: Function): void {
    queue.push(callback);
    if (queue.length > 1) {
      return;
    }
    i = (i + 1) % 2;
    node.data = i.toString();
  };
}

// imitate https://github.com/medikoo/next-tick/blob/master/index.js
export const nextTick = (function nextTick(): Function {
  if (
    process &&
    typeof process === 'object' &&
    typeof process.nextTick === 'function'
  ) {
    return process.nextTick;
  }

  if (document && typeof document === 'object') {
    let Observer: Observer;
    if (typeof MutationObserver === 'function') {
      Observer = MutationObserver;
    } else if (
      // @ts-ignore
      typeof WebKitMutationObserver === 'function'
    ) {
      // @ts-ignore
      Observer = WebKitMutationObserver;
    }
    if (Observer) {
      return byObserver(Observer);
    }
  }

  if (typeof setImmediate === 'function') {
    return setImmediate;
  }

  return function tick(callback: Function): void {
    setTimeout(callback, 0);
  };
})();

export const PROMISE_ID = Math.random()
  .toString(36)
  .substring(2);

let id = 0;

export function nextId() {
  id += 1;
  return id;
}

export function isPromise(x: any) {
  return isObject(x) && x[PROMISE_ID];
}

export function thenable(x: any) {
  return isObject(x) && isFunction(x.then);
}

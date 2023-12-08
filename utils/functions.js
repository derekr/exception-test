import EventEmitter from 'events';

export async function asyncFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('This is an async error'));
    }, 1000);
});
}

export function syncFunction() {
  throw new Error('This is a sync error');
}

export function higherLevelSync() {
  syncFunction()
}

export async function higherLevelAsyncReturn() {
  return asyncFunction()
}

export async function higherLevelAsyncAwait() {
  await asyncFunction()
}

export class SyncEmitter extends EventEmitter {
  execute(taskFunc) {
    console.log('Before executing sync task');
    this.emit('begin');
    try {
      taskFunc();
    } catch (error) {
      this.emit('error', error);
    }
    this.emit('end');
    console.log('After executing sync task');
  }
}

export class AsyncEmitter extends EventEmitter {
  async execute(taskFunc) {
    console.log('Before executing async task');
    this.emit('begin');
    try {
      await taskFunc();
    } catch (error) {
      this.emit('error', error);
    }
    this.emit('end');
    console.log('After executing async task');
  }
}

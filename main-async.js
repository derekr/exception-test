import { asyncFunction } from "./utils/functions.js";

async function main() {
  asyncFunction()
}

async function mainAwaited() {
  await asyncFunction()
}

async function mainReturned() {
  return asyncFunction()
}

process.on('unhandledRejection', (err, promise) => {
  console.log('unhandledRejection', err.message);
  console.log(promise);
})

const run = process.argv[2];

switch (run) {
  case 'unhandled':
    main().catch((err) => {
      // won't log
      console.log('main', err.message);
      process.exit(1);
    })
    break;
  /**
   * awaited and returned will behave the same way and 
   * not produce an unhandledRejection.
   */
  case 'awaited':
    mainAwaited().catch((err) => {
      // should log
      console.log('main', err.message);
      process.exit(1);
    })
  case 'returned':
    mainReturned().catch((err) => {
      console.log('main', err.message);
      process.exit(1);
    })
    break;
  default:
    console.log('Please specify a run mode');
}
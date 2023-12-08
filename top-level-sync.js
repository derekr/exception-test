import { asyncFunction } from "./utils/functions.js";

asyncFunction()

process.on('unhandledException', (err) => {
  console.log('unhandledException', err.message);
})
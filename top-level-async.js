import { asyncFunction } from "./utils/functions.js";

// Assume top-level await isn't available
asyncFunction()

process.on('unhandledRejection', (err) => {
  console.log('unhandledRejection', err.message);
})
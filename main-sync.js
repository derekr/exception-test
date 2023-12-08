import { syncFunction } from "./utils/functions.js";

async function main() {
  syncFunction()
}

process.on('unhandledRejection', (err) => {
  // should not log
  console.log('unhandledRejection', err.message);
  process.exit(1)
})

process.on('uncaughtException', (err) => {
  // should not log
  console.log('uncaughtException', err.message);
  process.exit(1);
})

main().catch((err) => {
  console.log('main', err.message);
  process.exit(1);
})
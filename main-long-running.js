import express from "express";
import "express-async-errors";
import {
  syncFunction,
  asyncFunction,
  SyncEmitter,
  AsyncEmitter,
} from "./utils/functions.js";

const syncEmitter = new SyncEmitter();
const asyncEmitter = new AsyncEmitter();

async function main() {
  const app = express();

  // Handled by onError middleware
  app.get("/unhandled-sync-error", (req, res) => {
    syncFunction();
    res.status(200).json({ title: "Unhandled sync error" });
  });

  // Unhandled Rejection
  app.get("/unhandled-async-error", async (req, res) => {
    asyncFunction();
    return res.status(200).json({ title: "Unhandled async error" });
  });

  // Caught via express-async-errors and handled by onError middleware
  // does not result in unhandled rejection
  app.get("/awaited-async-error", async (req, res) => {
    await asyncFunction();
    return res.status(200).json({ title: "Awaited sync error" });
  });

  // uncaughtException
  app.get("/sync-emitter-error", (req, res) => {
    setTimeout(() => {
      syncEmitter.execute(() => {
        syncFunction();
      });
    }, 0)
    res.status(200).json({ title: "Sync emitter error" });
  })

  // unhandledRejection
  app.get("/async-emitter-error", async (req, res) => {
    setTimeout(async () => {
      await asyncEmitter.execute(async () => {
        await asyncFunction();
      });
    })
    res.status(200).json({ title: "Async emitter error" });
  });

  app.use(function onError(error, req, res, next) {
    console.log("✅ Handled request error: ", error);
    res.status(500).json({ title: "Unexpected server error" });
    next(error);
  });

  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
}

main().catch((err) => {
  console.log("main", err.message);
  // Causes server to crash
  process.exit(1);
});

process.on("unhandledRejection", (err, promise) => {
  console.log("unhandledRejection", err.message);
  console.log(promise);
  // Causes server to crash
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err.message);
  // Causes server to crash
  process.exit(1);
})
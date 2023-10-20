import api_paths from "./api/paths.js";
import express from "express";
import ws_paths from "./ws/paths.js";

export const PORT = process.env.PORT || 8000;

const express_app = express();
let express_server = express_app.listen(PORT, () => {
  console.log(`HTTP SERVER LISTENING @ ${PORT}`);
});

for (const path in api_paths) {
  express_app.get("/api" + path, (req, res) => {
    res.sendFile(api_paths[path]);
  });
}

for (const path in ws_paths) {
  ws_paths[path](express_server);
}

process.on("message", (message) => {
  console.log("process message:", message);
});

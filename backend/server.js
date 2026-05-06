const express = require("express");
const cors = require("cors");

const db = require("../database/db");

const app = express();

app.use(cors());

app.use(express.json());

// =========================
// CREATE HTTP SERVER
// =========================
const http = require("http");

const server = http.createServer(app);

// =========================
// SOCKET.IO
// =========================
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// =========================
// SOCKET CONNECTION
// =========================
io.on("connection", (socket) => {

  console.log("🟢 Client connected");

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });

});

// =========================
// ROOT
// =========================
app.get("/", (req, res) => {
  res.send("Backend working");
});

// =========================
// GET RESULTS
// =========================
app.get("/results", (req, res) => {

  db.all(
    "SELECT * FROM results ORDER BY id DESC",
    (err, rows) => {

      if (err) {
        return res
          .status(500)
          .send(err);
      }

      res.json(rows);
    }
  );
});

// =========================
// SAVE RESULTS
// =========================
app.post("/results", (req, res) => {

  console.log("POST HIT:", req.body);

  const {
    name,
    status,
    duration,
    ai_analysis
  } = req.body;

  db.run(
    `
    INSERT INTO results
    (name, status, duration, ai_analysis)
    VALUES (?, ?, ?, ?)
    `,
    [
      name,
      status,
      duration,
      ai_analysis
    ],

    function (err) {

      if (err) {

        console.error(err);

        return res
          .status(500)
          .send("Error saving");
      }

      // =========================
      // LIVE EMIT
      // =========================
      io.emit("new-test", {
        id: this.lastID,

        name,
        status,
        duration,
        ai_analysis
      });

      res.send("Saved successfully");
    }
  );
});

// =========================
// START SERVER
// =========================
server.listen(3000, () => {
  console.log(
    "🚀 Server running on 3000"
  );
});
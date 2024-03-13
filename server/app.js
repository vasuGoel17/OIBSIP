require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const router = require("./routes/router");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware to attach 'io' to 'req'
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("stockUpdated", () => {
    io.emit("stockUpdated");
  });

  socket.on("orderPlaced", (orderId) => {
    io.emit("orderPlaced", orderId);
  });

  socket.on("orderDeleted", (orderId) => {
    io.emit("orderDeleted", orderId);
  });

  socket.on("orderUpdated", (orderId) => {
    io.emit("orderUpdated", orderId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
require("./db/conn");

app.get("/", (req, res) => {
  res.status(201).json("Server start");
});

app.use(router);
server.listen(PORT, function () {
  console.log(`server is successfully working at port ${PORT}`);
});

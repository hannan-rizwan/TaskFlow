const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");
const { setupSocket } = require("./socket/handler");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "http://localhost:3000", methods: ["GET", "POST", "PUT", "DELETE"] }
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/taskflow")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

setupSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`TaskFlow server running on port ${PORT}`));
module.exports = { app, server, io };

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
require('dotenv').config(); // For loading environment variables

const app = express(); // Create an Express application
const server = http.createServer(app); // Create HTTP server using Express app
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow CORS from your frontend
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.json()); // Parse JSON bodies (alternative)

// Routes
const authRoutes = require("./routes/auth"); // Import auth routes
const gameRoomRoutes = require("./routes/gameRoom"); // Import game room routes
app.use("/api/auth", authRoutes); // Use auth routes
app.use("/api/gameRoom", gameRoomRoutes); // Use game room routes

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/teenpatti";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Socket.IO connections
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // Example socket event handlers
  socket.on("startGame", (data) => {
    io.emit("gameStateUpdate", data); // Broadcast game state update to all connected clients
  });

  socket.on("playTurn", (data) => {
    io.emit("gameStateUpdate", data); // Broadcast game state update to all connected clients
  });
});

// Start server
const PORT = process.env.PORT || 5000; // Set port from environment variable or default to 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errormiddleware.js");
const app = express();
const pollRoutes = require("./routes/pollroutes");
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/polls", pollRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);
// Health check endpoint
app.get("/health", (req, res) => {
  res.send("the server is running");
});

module.exports = app;
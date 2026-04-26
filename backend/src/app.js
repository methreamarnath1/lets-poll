const express = require("express");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("the server is running");
});

module.exports = app;

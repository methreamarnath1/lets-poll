const express = require("express");
const pollRoutes = require("./routes/pollroutes");
const app = express();

app.use(express.json());
app.use("/polls", pollRoutes);

app.get("/health", (req, res) => {
  res.send("the server is running");
});

module.exports = app;

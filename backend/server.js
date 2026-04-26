const app = require("./src/app");
require("dotenv").config();
const connectToDB = require("./src/config/database");
connectToDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("create a poll at http://localhost:3000/polls");
  console.log("get all polls at http://localhost:3000/polls");
  console.log("get poll results at http://localhost:3000/polls/:id/results");
  console.log("vote on a poll at http://localhost:3000/polls/:id/vote");
  console.log("delete a poll at http://localhost:3000/polls/:id");
});

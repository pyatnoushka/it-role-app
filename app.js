const express = require("express");
const app = express();
const port = 8888;

const itRoleController = require("./controller/itRole");
const questionController = require("./controller/question");

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("IT Role App is running!");
});

app.use("/itRole", itRoleController);
app.use("/question", questionController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
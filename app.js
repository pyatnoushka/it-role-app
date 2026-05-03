const express = require("express");
const app = express();
const port = 8888;

const itRoleController = require("./controller/itRole");
const questionController = require("./controller/question");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("IT Role App is running!");
});

app.use("/itRole", itRoleController);
app.use("/question", questionController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
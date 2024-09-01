const express = require("express");
require("dotenv").config();
require("./utils/db");
const userRouter = require("./user/user.router");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

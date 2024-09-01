const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./utils/db");
const userRouter = require("./user/user.router");
const hospitalRouter = require("./hospital/hospital.router");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/hospitals", hospitalRouter);

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

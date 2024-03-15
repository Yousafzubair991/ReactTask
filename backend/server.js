require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const userRoute = require("./api/routes/user");
const postRoute = require("./api/routes/post");
const port = process?.env?.port || 3000;

mongoose.set("strictQuery", false);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRoute);
app.use("/posts", postRoute);

mongoose.connect(process.env.DBURL);
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to database", err);
});

app.use((req, res) => {
  res?.status(400);
  res.send({ error: "BAD REQUEST" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

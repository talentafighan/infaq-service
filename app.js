const express = require("express");
const config = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserController = require("./controllers/users/User");
const app = express();

const path = require("path");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

mongoose
  .connect(config, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb Successfuly Connect !"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/api/user", UserController);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server running on port " + PORT));

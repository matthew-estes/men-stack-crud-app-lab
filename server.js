const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", function () {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Chicken = require("./models/chickens");

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});

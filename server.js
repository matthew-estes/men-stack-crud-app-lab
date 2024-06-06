const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", function () {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Film = require("./models/Film");

app.get("/film", async function (req, res) {
  const allFilm = await Film.find();
  res.render("film/index.ejs", { film: allFilm });
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/film/new", function (req, res) {
  res.render("./film/new.ejs");
});

app.post("/film", async function (req, res) {
  try {
    await Film.create(req.body);
    res.redirect("/film");
  } catch (error) {
    res.status(500).send("error creating film");
  }
});

app.get("/film/:filmId", async function (req, res) {
  const foundFilm = await Film.findById(req.params.filmId);
  res.render("film/show.ejs", { film: foundFilm });
});


app.get('/film/:filmId/edit', async function (req, res) {
  try {
    const foundFilm = await Film.findById(req.params.filmId);
    res.render("film/edit.ejs", { film: foundFilm });
  } catch (err) {
    res.status(500).send("error retrieving film for edit")
  }
})

app.put("/film/:filmId", async function(req, res){
  await Film.findByIdAndUpdate(req.params.filmId, req.body);
  res.redirect(`/film/${req.params.filmId}`);
});

app.delete("/film/:filmId", async function (req, res) {
  await Film.findByIdAndDelete(req.params.filmId);
  res.redirect("/film");
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});


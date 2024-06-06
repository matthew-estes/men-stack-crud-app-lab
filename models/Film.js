const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseYear: Number,
  director: String,
  star: String,
  genre: { type: String, enum: ['Action', 'Comedy', 'Drama', 'Horror'], required: true },
  personalRating: Number,
});

const Film = mongoose.model("Film", filmSchema);
module.exports = Film;

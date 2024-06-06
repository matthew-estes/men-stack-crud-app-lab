const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: {
    type: String,
    enum: ["Action", "Comedy", "Crime", "Drama", "Horror", "Mystery", "Romantic", "Sci-Fi"],
    required: true,
  },
  releaseYear: String,
  director: String,
  actor: String,
  personalRating: Number,
});

const Film = mongoose.model("Film", filmSchema);
module.exports = Film;

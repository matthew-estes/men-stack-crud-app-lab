const mongoose = require('mongoose')

const chickenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
})

const Chicken = mongoose.model('Chicken', chickenSchema)
module.exports = Chicken
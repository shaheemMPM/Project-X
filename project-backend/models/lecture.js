const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lectureSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false, default: "" },
  url: { type: String, required: true },
  classroom: { type: String, required: true },
  createdAt: { type: Number, required: true },
});

module.exports = mongoose.model("Lecture", lectureSchema);
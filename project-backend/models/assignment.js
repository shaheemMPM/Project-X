const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false, default: "" },
  chapter: { type: String, required: false, default: "" },
  totalmark: { type: Number, required: true },
  dueTime: { type: Number, required: true },
  classroom: { type: String, required: true },
  createdAt: { type: Number, required: true },
});

module.exports = mongoose.model("Assignment", assignmentSchema);

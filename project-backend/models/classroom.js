const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  credit: { type: String, required: false },
  description: { type: String, required: false, default: " " },
  createdBy: { type: String, require: true },
  createdAt: { type: Number, require: true, default: Number(new Date()) },
  students: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Classroom", classroomSchema);

const mongoose = require("mongoose");
const randomString = require('random-string');

const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  credit: { type: String, required: false },
  description: { type: String, required: false, default: " " },
  createdBy: { type: String, require: true },
  createdAt: { type: Number, require: true, default: Number(new Date()) },
  liveClassId: { type: String, require: true, default: randomString({ length: 10 }) },
  isClassLive: { type: Boolean, default: false },
  students: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Classroom", classroomSchema);

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true, unique: true  },
	email: { type: String, required: false, unique: true },
	password: { type: String, required: true, minlength: 6 },
	createdAt: { type: Number, require: true, default: Number(new Date()) }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
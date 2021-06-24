const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  lectureId: { type: String, required: true },
  chats: [
    {
      authorId: { type: String, required: true },
      authorName: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
  createdAt: { type: Number, required: true },
});

module.exports = mongoose.model("Chat", chatSchema);

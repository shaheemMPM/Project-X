// const { validationResult } = require("express-validator");
// const HttpError = require("../models/http-error");
const Chat = require("../models/chat");

const createChat = async (req, res, next) => {
  const { authorId, authorName, lectureId, text } = req.body;
  const createdAt = Number(new Date());

  let fullChat;

  try {
    fullChat = await Chat.find({ lectureId });
  } catch (err) {
    console.error("Error while reading createChat", err);
    return next(new HttpError("db read failed, please try again later.", 500));
  }

  if (fullChat) {
    fullChat.chats.push({
      authorId,
      authorName,
      text,
    });
  } else {
    fullChat = new Chat({
      lectureId,
      chats: {
        authorId,
        authorName,
        text,
      },
      createdAt,
    });
  }

  try {
    await fullChat.save();
  } catch (err) {
    console.error("Error while saving created fullChat in createChat", err);
    return next(
      new HttpError("create fullChat failed, please try again later.", 500)
    );
  }
  res.status(201).json({
    msg: "chat Uploaded",
    file: fullChat._doc,
  });
};

const getChat = async (req, res, next) => {
  let lectureId = req.params.cid;

  try {
    fullChat = await Chat.find({ lectureId });
  } catch (err) {
    console.error("Error while reading getChat", err);
    return next(new HttpError("db read failed, please try again later.", 500));
  }

  res.status(201).json({
    message: "read fullChat successfully",
    data: fullChat,
  });
};

exports.createChat = createChat;
exports.getChat = getChat;

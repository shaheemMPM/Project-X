const express = require("express");
// const { check } = require("express-validator");

const chatController = require("../controllers/chat-controllers");

// const checkAuth = require("../middlewares/isauth");

const router = express.Router();

// router.use(checkAuth);

router.post("/", chatController.createChat);

router.get("/:lid", chatController.getChat);

module.exports = router;

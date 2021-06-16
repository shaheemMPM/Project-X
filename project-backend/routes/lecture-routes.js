const express = require("express");
// const { check } = require("express-validator");

const lectureController = require("../controllers/lecture-controllers");

// const checkAuth = require("../middlewares/isauth");

const router = express.Router();

// router.use(checkAuth);

router.post("/", lectureController.createLecture);

router.get("/class/:cid", lectureController.getLectures);

router.get("/:lid", lectureController.getLectureById);

module.exports = router;

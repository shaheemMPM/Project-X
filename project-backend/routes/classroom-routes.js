const express = require("express");
const { check } = require("express-validator");

const classroomController = require("../controllers/classroom-controllers");

const checkAuth = require("../middlewares/isauth");

const router = express.Router();

router.use(checkAuth);

router.post(
  "/",
  [check("title").not().isEmpty(), check("subtitle").not().isEmpty()],
  classroomController.createClassroom
);

router.get("/my", classroomController.getMyClassrooms);

router.get("/joined", classroomController.getJoinedClassrooms);

router.get("/:cid", classroomController.getClassroomById);

router.patch(
  "/join",
  [check("classId").not().isEmpty()],
  classroomController.joinClassroom
);

module.exports = router;

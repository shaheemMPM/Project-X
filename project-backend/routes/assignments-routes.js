const express = require("express");
// const { check } = require("express-validator");

const assignmentController = require("../controllers/assignments-controllers");

// const checkAuth = require("../middlewares/isauth");

const router = express.Router();

// router.use(checkAuth);

router.post("/", assignmentController.createAssignment);

router.get("/class/:cid", assignmentController.getAssignments);

router.get("/:lid", assignmentController.getAssignmentById);

module.exports = router;

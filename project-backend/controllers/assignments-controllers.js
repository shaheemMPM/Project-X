// const { validationResult } = require("express-validator");
// const HttpError = require("../models/http-error");
const Assignment = require("../models/assignment");

const createAssignment = async (req, res, next) => {
  const { title, description, classroom, chapter, dueTime } = req.body;
  const createdAt = Number(new Date());

  const createdAssignment = new Assignment({
    title,
    description,
    classroom,
    chapter,
    dueTime,
    createdAt,
  });

  try {
    await createdAssignment.save();
  } catch (err) {
    console.error(
      "Error while saving created assignment in createAssignment",
      err
    );
    return next(
      new HttpError("create assignment failed, please try again later.", 500)
    );
  }
  res.status(201).json({
    msg: "assignment Uploaded",
    file: createdAssignment._doc,
  });
};

const getAssignments = async (req, res, next) => {
  let classroomId = req.params.cid;

  try {
    assignments = await Assignment.find({ classroom: classroomId });
  } catch (err) {
    console.error("Error while reading getAssignments", err);
    return next(new HttpError("db read failed, please try again later.", 500));
  }

  res.status(201).json({
    message: "read assignments successfully",
    data: assignments,
  });
};

const getAssignmentById = async (req, res, next) => {
  let assignmentId = req.params.lid;

  try {
    assignment = await Assignment.findById(assignmentId);
  } catch (err) {
    console.error("Error while reading getAssignmentById", err);
    return next(new HttpError("db read failed, please try again later.", 500));
  }

  res.status(201).json({
    message: "read assignment successfully",
    data: assignment,
  });
};

exports.createAssignment = createAssignment;
exports.getAssignments = getAssignments;
exports.getAssignmentById = getAssignmentById;

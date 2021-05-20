const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Classroom = require("../models/classroom");

const createClassroom = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Invalid inputs passed in user sign up");
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let { title, subtitle, credit, description } = req.body;
  const createdBy = req.userData.username;
  const createdAt = Number(new Date());

  if (!credit) {
    credit = " ";
  }

  if (!description) {
    description = " ";
  }

  const createdClassroom = new Classroom({
    title,
    subtitle,
    credit,
    description,
    createdBy,
    createdAt,
  });

  try {
    await createdClassroom.save();
  } catch (err) {
    console.error(
      "Error while saving created classroom in createClassroom",
      err
    );
    return next(
      new HttpError("create classroom failed, please try again later.", 500)
    );
  }

  res.status(201).json({
    message: "created classroom successfully",
    data: createdClassroom._doc,
  });
};

const getMyClassrooms = async (req, res, next) => {
  let createdBy = req.userData.username;
  let classrooms;

  try {
    classrooms = await Classroom.find({ createdBy });
  } catch (err) {
    console.error("Error while reading getMyClassrooms", err);
    return next(new HttpError("db read failed, please try again later.", 500));
  }

  res.status(201).json({
    message: "read classrooms successfully",
    data: classrooms,
  });
};

const getJoinedClassrooms = async (req, res, next) => {
  let username = req.userData.username;
  let classrooms;

  try {
    classrooms = await Classroom.find({ students: username });
  } catch (err) {
    console.error("Error while reading getJoinedClassrooms", err);
    return next(new HttpError("db read failed, please try again later.", 500));
  }

  res.status(201).json({
    message: "read classrooms successfully",
    data: classrooms,
  });
};

const joinClassroom = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Invalid inputs passed in join classroom");
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let username = req.userData.username;

  const { classId } = req.body;

  let classroom;

  try {
    classroom = await Classroom.findById(classId);
  } catch (err) {
    console.error("Error while reading joinClassroom", err);
    return next(new HttpError("db read failed, please try again later.", 500));
  }

  if (!classroom) {
    return next(
      new HttpError("can't find classroom, please try again later.", 404)
    );
  }

  classroom.students.push(username);

  try {
    await classroom.save();
  } catch (err) {
    console.error("Error while saving in joinClassroom", err);
    return next(new HttpError("db save failed, please try again later.", 500));
  }

  res.status(201).json({
    message: "joined classroom successfully",
    data: classroom,
  });
};

exports.createClassroom = createClassroom;
exports.getMyClassrooms = getMyClassrooms;
exports.getJoinedClassrooms = getJoinedClassrooms;
exports.joinClassroom = joinClassroom;

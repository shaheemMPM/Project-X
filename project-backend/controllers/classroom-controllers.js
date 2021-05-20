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

exports.createClassroom = createClassroom;

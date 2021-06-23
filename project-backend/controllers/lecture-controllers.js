// const { validationResult } = require("express-validator");
// const HttpError = require("../models/http-error");
const Lecture = require("../models/lecture");
const path = require("path");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
}).single("myfile");

const createLecture = async (req, res, next) => {
  upload(req, res, async (err) => {
    const { title, description, classroom } = req.body;
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      if (req.file == undefined) {
        res.status(404).json({
          message: "can't find file",
        });
      } else {
        const form = new FormData();
        const filePath = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          req.file.filename
        );

        form.append("file", fs.createReadStream(filePath));

        const request_config = {
          headers: {
            ...form.getHeaders(),
          },
        };

        let response, transcript, keywords;

        try {
          response = await axios.post(
            "http://localhost:8080",
            form,
            request_config
          );
          response = await axios.get("http://localhost:8080");

          if (response.data.transcript) {
            transcript = response.data.transcript;
          }
          if (response.data.keywords) {
            keywords = response.data.keywords;
          }
        } catch (error) {
          console.error(error);
        }

        const createdLecture = new Lecture({
          title,
          description,
          classroom,
          url: `uploads/${req.file.filename}`,
          transcript,
          keywords,
          createdAt: Date.now(),
        });

        try {
          await createdLecture.save();
        } catch (err) {
          console.error(
            "Error while saving created lecture in createLecture",
            err
          );
          return next(
            new HttpError("create lecture failed, please try again later.", 500)
          );
        }
        res.status(201).json({
          msg: "Lecture Uploaded",
          file: createdLecture._doc,
        });
      }
    }
  });
};

const getLectures = async (req, res, next) => {
  let classroomId = req.params.cid;

  try {
    lectures = await Lecture.find({ classroom: classroomId });
  } catch (err) {
    console.error("Error while reading getLectures", err);
    return next(new HttpError("db read failed, please try again later.", 500));
  }

  res.status(201).json({
    message: "read lectures successfully",
    data: lectures,
  });
};

const getLectureById = async (req, res, next) => {
  let lectureId = req.params.lid;

  try {
    lecture = await Lecture.findById(lectureId);
  } catch (err) {
    console.error("Error while reading getLectures", err);
    return next(new HttpError("db read failed, please try again later.", 500));
  }

  res.status(201).json({
    message: "read lectures successfully",
    data: lecture,
  });
};

exports.createLecture = createLecture;
exports.getLectures = getLectures;
exports.getLectureById = getLectureById;

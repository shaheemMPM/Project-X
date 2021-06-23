// const { validationResult } = require("express-validator");
// const HttpError = require("../models/http-error");
const Material = require("../models/material");
const path = require("path");
const multer = require("multer");

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

const createMaterial = async (req, res, next) => {
  upload(req, res, async (err) => {
    const { title, description, chapter, classroom } = req.body;
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
        const createdMaterial = new Material({
          title,
          description,
          chapter,
          classroom,
          url: `uploads/${req.file.filename}`,
          createdAt: Date.now(),
        });

        try {
          await createdMaterial.save();
        } catch (err) {
          console.error(
            "Error while saving created material in createMaterial",
            err
          );
          return next(
            new HttpError(
              "create material failed, please try again later.",
              500
            )
          );
        }
        res.status(201).json({
          msg: "material Uploaded",
          file: createdMaterial._doc,
        });
      }
    }
  });
};

const getMaterials = async (req, res, next) => {
  let classroomId = req.params.cid;

  try {
    materials = await Material.find({ classroom: classroomId });
  } catch (err) {
    console.error("Error while reading getMaterials", err);
    return next(new HttpError("db read failed, please try again later.", 500));
  }

  res.status(201).json({
    message: "read materials successfully",
    data: materials,
  });
};

const getMaterialById = async (req, res, next) => {
  let materialId = req.params.lid;

  try {
    material = await Material.findById(materialId);
  } catch (err) {
    console.error("Error while reading getMaterialById", err);
    return next(new HttpError("db read failed, please try again later.", 500));
  }

  res.status(201).json({
    message: "read material successfully",
    data: material,
  });
};

exports.createMaterial = createMaterial;
exports.getMaterials = getMaterials;
exports.getMaterialById = getMaterialById;

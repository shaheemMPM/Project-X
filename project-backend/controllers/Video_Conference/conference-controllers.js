const Classroom = require("../../models/classroom");
const { validationResult } = require("express-validator");
const HttpError = require("../../models/http-error");

// const checkUserPermissions = async (req, res, next) => {
// 	const errors = validationResult(req);
// 	if (!errors.isEmpty()) {
// 		console.error("Invalid inputs passed");

// 		return next(
// 			new HttpError("Invalid inputs passed, please check your data.", 422)
// 		);
// 	}

//     let { username, classId } = req.body;
//     try {
//         let classroom = await Classroom.findById(classId);
//         if(classroom.students.includes(username)){

//         }
//     }
//     catch (error){

//     }
// };

// module.exports = checkUserPermissions;
const setAttention = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error("Invalid inputs for attention");
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }
    let classroom;

    try {
        classroom = await Classroom.findById(req.body.classId);
    }
    catch (err) {
        console.error("Error while reading DB", err);
        return next(new HttpError("db read failed, please try again later.", 500));
    }
    console.log(classroom.attention);
    classroom.attention = req.body.attention === true?100:0;

    try {
        await classroom.save();
    } 
    catch (err) {
        console.error("Error while saving in joinClassroom", err);
        return next(new HttpError("db save failed, please try again later.", 500));
    }
    res.status(201);
}

const getAttention = async (req, res, next) => {
    let classroom;

    try {
        classroom = await Classroom.findById(req.params.classId);
    }
    catch (err) {
        console.error("Error while reading DB", err);
        return next(new HttpError("db read failed, please try again later.", 500));
    }
    res.json({attention : classroom.attention});

}

exports.setAttention = setAttention;
exports.getAttention = getAttention;

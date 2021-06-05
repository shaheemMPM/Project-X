const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Classroom = require("../models/classroom");

const getConferenceId = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error("Invalid inputs passed in user sign up");
        return next(
        new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }

    let { clientId, classId } = req.body;
    try{
        let classroom = await Classroom.findById(classId);
        if(classroom.students.includes(clientId))
    }

}
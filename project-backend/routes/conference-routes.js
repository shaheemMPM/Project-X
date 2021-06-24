const express = require("express");
const { check } = require("express-validator");

const conferenceController = require("../controllers/Video_Conference/conference-controllers");

const router = express.Router();

// router.post("/",
//     [
//         check("classId").exists(),
//         check("username").exists()
//     ],
//     conferenceController
// );

router.post("/attention",
    [
        check("attention").not().isEmpty()
    ],
    conferenceController.setAttention
);
router.get("/attention/:classId", conferenceController.getAttention);

module.exports = router;
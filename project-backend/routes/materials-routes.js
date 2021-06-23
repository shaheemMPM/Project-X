const express = require("express");
// const { check } = require("express-validator");

const materialController = require("../controllers/materials-controllers");

// const checkAuth = require("../middlewares/isauth");

const router = express.Router();

// router.use(checkAuth);

router.post("/", materialController.createMaterial);

router.get("/class/:cid", materialController.getMaterials);

router.get("/:lid", materialController.getMaterialById);

module.exports = router;

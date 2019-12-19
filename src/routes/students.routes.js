const express = require("express");
const router = express.Router();

const multerMiddleware = require("../middlewares/multer.middlewares");

const studentController = require("../controllers/students.controllers");

router.post("/", multerMiddleware.upload.single("students"), studentController.importStudents);

module.exports = router;

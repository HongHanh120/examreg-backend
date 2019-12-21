const express = require("express");
const router = express.Router();

const multerMiddleware = require("../middlewares/multer.middlewares");
const privilege = require("../middlewares/privilege.middlewares");
const token = require("../middlewares/tokenLogin.middlewares");
const studentController = require("../controllers/students.controllers");

router.post("/", token.verify,
    privilege.verify(1),
    privilege.verify(2),
    multerMiddleware.upload.single("students"),
    studentController.importStudents);

module.exports = router;

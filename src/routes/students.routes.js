const express = require("express");
const router = express.Router();

const multerMiddleware = require("../middlewares/multer.middlewares");
const privilege = require("../middlewares/privilege.middlewares");
const token = require("../middlewares/tokenLogin.middlewares");
const examinationToken = require("../middlewares/tokenExamination.middlewares");
const studentController = require("../controllers/students.controllers");

router.post("/", token.verify,
    privilege.verify(2),
    multerMiddleware.upload.single("students"),
    studentController.importStudents);

router.get("/",
    token.verify,
    privilege.verify(2),
    studentController.getStudentList);

router.get("/examreg",
    examinationToken.verify,
    studentController.getSubjectOfRegister);

router.post("/examreg",
    examinationToken.verify,
    studentController.registerExam);

module.exports = router;

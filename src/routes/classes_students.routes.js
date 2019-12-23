const express = require("express");
const router = express.Router();
const token = require("../middlewares/tokenLogin.middlewares");const privilege = require("../middlewares/privilege.middlewares");
const examinationToken = require("../middlewares/tokenExamination.middlewares");
const multerMiddleware = require("../middlewares/multer.middlewares");

const classStudentController = require("../controllers/classes_students.controllers");

router.post("/import",
    examinationToken.verify,
    privilege.verify(2),
    multerMiddleware.upload.single("classesStudents"),
    classStudentController.importClassesStudents);

router.get("/",
    examinationToken.verify,
    privilege.verify(2),
    classStudentController.getStudentsOfClass);

module.exports = router;

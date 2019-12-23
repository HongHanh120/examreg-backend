const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjects.controllers");
const token = require("../middlewares/tokenLogin.middlewares");
const examinationToken = require("../middlewares/tokenExamination.middlewares");5
const privilege = require("../middlewares/privilege.middlewares");
const multerMiddleware = require("../middlewares/multer.middlewares");

router.post("/",
    token.verify,
    privilege.verify(1),
    subjectController.createSubject);

router.delete("/",
    token.verify,
    privilege.verify(1),
    subjectController.deleteSubject);

router.put("/", token.verify,
    privilege.verify(1),
    subjectController.updateSubject);

router.get("/",
    token.verify,
    privilege.verify(2),
    subjectController.getAllSubject);

router.get("/search",
    token.verify,
    subjectController.getSubjectByKeyword);

router.get("/information",
    token.verify,
    subjectController.getInformation);

router.post("/import",
    token.verify,
    privilege.verify(2),
    multerMiddleware.upload.single("subjects"),
    subjectController.importSubjects);

router.get("/examination",
    examinationToken.verify,
    subjectController.getSubjectsInExam);

module.exports = router;

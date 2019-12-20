const express = require("express");
const router = express.Router();
const examinationController = require("../controllers/examinations.controllers");
const token = require("../middlewares/tokenLogin.middlewares");
const privilege = require("../middlewares/privilege.middlewares");

router.post("/", token.verify, privilege.verify(9), examinationController.createExamination);
router.put("/", token.verify, privilege.verify(10), examinationController.updateExamination);
router.delete("/", token.verify, privilege.verify(11), examinationController.deleteExamination);
router.delete("/examinations", token.verify, privilege.verify(11), examinationController.deleteExaminations);
router.get("/", token.verify, privilege.verify(10), examinationController.getAllExaminations);
router.get("/search", token.verify, examinationController.getExaminationByKeyword);

module.exports = router;

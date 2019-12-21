const express = require("express");
const router = express.Router();
const examinationController = require("../controllers/examinations.controllers");
const token = require("../middlewares/tokenLogin.middlewares");
const privilege = require("../middlewares/privilege.middlewares");

router.post("/", token.verify, privilege.verify(1), examinationController.createExamination);
router.put("/", token.verify, privilege.verify(1), examinationController.updateExamination);
router.delete("/", token.verify, privilege.verify(1), examinationController.deleteExamination);
router.get("/", token.verify, privilege.verify(1), examinationController.getAllExaminations);
router.get("/search", token.verify, examinationController.getExaminationByKeyword);
router.get("/information", token.verify, examinationController.getInformation);

module.exports = router;

const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjects.controllers");
const token = require("../middlewares/tokenLogin.middlewares");
const privilege = require("../middlewares/privilege.middlewares");

router.post("/", token.verify, privilege.verify(1), subjectController.createSubject);
router.delete("/", token.verify, privilege.verify(1), subjectController.deleteSubject);
router.delete("/deleteMulti", token.verify, privilege.verify(1), subjectController.deleteSubjects);
router.put("/", token.verify, privilege.verify(1), subjectController.updateSubject);
router.get("/", token.verify, privilege.verify(1), privilege.verify(2), subjectController.getAllSubject);
router.get("/search", token.verify, subjectController.getSubjectByKeyword);
router.get("/information", token.verify, subjectController.getInformation);

module.exports = router;

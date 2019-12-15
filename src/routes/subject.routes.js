const express = require("express");
const router = express.Router();
const subjectController = require("../models/subject.controllers");

router.post("/create", subjectController.createSubject);
router.post("/delete", subjectController.deleteSubject);
router.post("/update", subjectController.updateSubject);


module.exports = router;

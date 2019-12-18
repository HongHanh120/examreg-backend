const express = require("express");
const router = express.Router();
const ExamController = require("../controllers/exams.controllers");
const tokencheck = require("../middlewares/tokens.middlewares");
const role = require("../middlewares/roles.middlewares");

router.post("/create", tokencheck.verify, role.verify_isSuperAdmin, ExamController.createExam);
router.put("/update", tokencheck.verify, role.verify_isSuperAdmin, ExamController.updateExam);
router.delete("/delete", tokencheck.verify, role.verify_isSuperAdmin, ExamController.deleteExams);
router.get("/", ExamController.getAllExam);

module.exports = router;

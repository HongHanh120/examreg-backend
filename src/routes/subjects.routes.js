const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjects.controllers");
const tokencheck = require("../middlewares/tokenLogin.middlewares");
const role = require("../middlewares/role.middlewares");

router.post("/create", tokencheck.verify, role.verify_isAdmin, subjectController.createSubject);
router.delete("/delete", tokencheck.verify, role.verify_isAdmin, subjectController.deleteSubject);
router.put("/update", tokencheck.verify, role.verify_isAdmin, subjectController.updateSubject);
router.get("/", subjectController.getAllSubject);
router.get("/search", subjectController.getSubjectbyKeyword);

module.exports = router;

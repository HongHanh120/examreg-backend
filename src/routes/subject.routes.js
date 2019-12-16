const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject.controllers");
const tokencheck=require("../middlewares/tokens.middlewares");
const role=require("../middlewares/role.middlewares");

router.post("/create", tokencheck.verify,role.verify_isNotAdmin,subjectController.createSubject);
router.post("/delete", subjectController.deleteSubject);
router.post("/update", subjectController.updateSubject);


module.exports = router;

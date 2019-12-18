const express = require("express");
const router = express.Router();
const ClassesController = require("../controllers/classes.controllers");
const tokencheck = require("../middlewares/tokens.middlewares");
const role = require("../middlewares/roles.middlewares");

router.post("/create", tokencheck.verify, role.verify_isAdmin, ClassesController.createClass);
// router.put("/update", tokencheck.verify, role.verify_isAdmin, ClassesController.updateExam);
router.delete("/delete", tokencheck.verify, role.verify_isAdmin, ClassesController.deleteClasses);
router.get("/", ClassesController.getAllClass);

module.exports = router;

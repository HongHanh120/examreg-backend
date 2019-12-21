const express = require("express");
const router = express.Router();
const shiftController = require("../controllers/shifts.controllers");
const token = require("../middlewares/tokenLogin.middlewares");
const examinationToken = require("../middlewares/tokenExamination.middlewares");
const privilege = require("../middlewares/privilege.middlewares");

router.post("/", examinationToken.verify, privilege.verify(21), shiftController.createShift);
router.put("/", examinationToken.verify, privilege.verify(22), shiftController.updateShift);
router.delete("/", examinationToken.verify, privilege.verify(23), shiftController.deleteShift);
router.get("/", examinationToken.verify, privilege.verify(24), shiftController.getAllShift);
router.get("/information", examinationToken.verify, privilege.verify(25), shiftController.getInformation);

module.exports = router;

const express = require("express");
const router = express.Router();
const shiftController = require("../controllers/shifts.controllers");
const token = require("../middlewares/tokenLogin.middlewares");
const examinationToken = require("../middlewares/tokenExamination.middlewares");
const privilege = require("../middlewares/privilege.middlewares");

router.post("/",
    examinationToken.verify,
    privilege.verify(1),
    shiftController.createShift);
router.put("/",
    examinationToken.verify,
    privilege.verify(1),
    shiftController.updateShift);
router.delete("/",
    examinationToken.verify,
    privilege.verify(1),
    shiftController.deleteShift);
router.get("/",
    examinationToken.verify,
    privilege.verify(2),
    shiftController.getAllShift);
router.get("/information",
    examinationToken.verify,
    privilege.verify(2),
    shiftController.getInformation);

module.exports = router;

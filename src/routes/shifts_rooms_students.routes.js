const express = require("express");
const router = express.Router();
const token = require("../middlewares/tokenLogin.middlewares");
const examinationToken = require("../middlewares/tokenExamination.middlewares");
const privilege = require("../middlewares/privilege.middlewares");

const shiftRoomStudentController = require("../controllers/shifts_rooms_students.controllers");

router.post("/",
    examinationToken.verify,
    shiftRoomStudentController.create);

router.delete("/",
    examinationToken.verify,
    shiftRoomStudentController.deleteShiftRoomStudent);

module.exports = router;

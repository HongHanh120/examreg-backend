const express = require("express");
const router = express.Router();
const shiftRoomController = require("../controllers/shifts_rooms.controllers");
const token = require("../middlewares/tokenLogin.middlewares");
const examinationToken = require("../middlewares/tokenExamination.middlewares");
const privilege = require("../middlewares/privilege.middlewares");

router.post("/",
    examinationToken.verify,
    privilege.verify(2),
    shiftRoomController.create);

router.put("/",
    examinationToken.verify,
    privilege.verify(2),
    shiftRoomController.update);

module.exports = router;

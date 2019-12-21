const express = require("express");
const router = express.Router();
const roomController = require("../controllers/rooms.controllers");
const token = require("../middlewares/tokenLogin.middlewares");
const privilege = require("../middlewares/privilege.middlewares");

router.post("/", token.verify, privilege.verify(16), roomController.createRoom);
router.put("/", token.verify, privilege.verify(17), roomController.updateRoom);
router.delete("/", token.verify, privilege.verify(18), roomController.deleteRoom);
router.get("/", token.verify, privilege.verify(19), roomController.getAllRoom);
router.get("/information", token.verify, privilege.verify(20), roomController.getInformation);

module.exports = router;

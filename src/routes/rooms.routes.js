const express = require("express");
const router = express.Router();
const roomController = require("../controllers/rooms.controllers");
const token = require("../middlewares/tokenLogin.middlewares");
const privilege = require("../middlewares/privilege.middlewares");

router.post("/",
    token.verify,
    privilege.verify(1),
    roomController.createRoom);
router.put("/",
    token.verify,
    privilege.verify(1),
    roomController.updateRoom);
router.delete("/",
    token.verify,
    privilege.verify(1),
    roomController.deleteRoom);
router.get("/",
    token.verify,
    privilege.verify(2),
    roomController.getAllRoom);
router.get("/information",
    token.verify,
    privilege.verify(2),
    roomController.getInformation);

module.exports = router;

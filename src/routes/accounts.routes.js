const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accounts.controllers");

router.post("/login", accountController.login);
router.post("/register", accountController.register);

module.exports = router;

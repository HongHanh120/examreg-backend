const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accounts.controllers");
const token = require("../middlewares/tokens.middlewares");

router.post("/login", accountController.login);
router.post("/register", accountController.register);
router.put("/password", token.verify, accountController.changePassword);
router.get("/student", token.verify, accountController.getStudentList);

module.exports = router;

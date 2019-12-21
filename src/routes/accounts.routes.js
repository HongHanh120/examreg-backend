const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accounts.controllers");
const token = require("../middlewares/tokenLogin.middlewares");
const privilege = require("../middlewares/privilege.middlewares");
const examination_token = require("../middlewares/tokenExamination.middlewares");

router.post("/login",
    accountController.login);
router.post("/register",
    privilege.verify(2),
    accountController.register);
router.put("/password",
    token.verify,
    accountController.changePassword);
router.get("/student",
    token.verify,
    privilege.verify(1),
    privilege.verify(2),
    accountController.getStudentList);
router.get("/admin",
    token.verify,
    privilege.verify(1),
    accountController.getAdminList);
router.get("/examination/:examination_id",
    token.verify,
    accountController.getCurrentExaminationToken);

module.exports = router;

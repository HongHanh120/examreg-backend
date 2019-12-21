const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accounts.controllers");
const token = require("../middlewares/tokenLogin.middlewares");
const privilege = require("../middlewares/privilege.middlewares");
const examination_token = require("../middlewares/tokenExamination.middlewares");
const role = require("../middlewares/role.middlewares");


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
    privilege.verify(2),
    accountController.getStudentList);

router.get("/admin",
    token.verify,
    privilege.verify(2),
    accountController.getAdminList);

router.get("/examination/:examination_id",
    token.verify,
    accountController.getCurrentExaminationToken);

router.put("/information",
    token.verify,
    accountController.updateInformation);

router.delete("/",
    token.verify,
    privilege.verify(1),
    role.verify,
    accountController.deleteUser);

module.exports = router;

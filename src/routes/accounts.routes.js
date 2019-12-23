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
    accountController.register);

router.put("/password",
    token.verify,
    accountController.changePassword);

router.get("/admin",
    token.verify,
    privilege.verify(2),
    accountController.getAdminList);

router.get("/examination/:examination_id",
    token.verify,
    accountController.getCurrentExaminationToken);

router.put("/",
    token.verify,
    accountController.updateInformation);

router.delete("/",
    token.verify,
    privilege.verify(2),
    role.verify,
    accountController.deleteUser);

router.get("/",
    token.verify,
    privilege.verify(2),
    accountController.getAllAccount);

router.get("/eligibility",
    examination_token.verify,
    privilege.verify(2),
    accountController.getAllNotEligibleStudents);

module.exports = router;

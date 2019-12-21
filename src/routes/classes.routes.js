const express = require("express");
const router = express.Router();
const classController = require("../controllers/classes.controllers");
const token = require("../middlewares/tokenLogin.middlewares");
const privilege = require("../middlewares/privilege.middlewares");
const examinationToken = require("../middlewares/tokenExamination.middlewares");
const multerMiddleware = require("../middlewares/multer.middlewares");

router.post("/",
    examinationToken.verify,
    privilege.verify(2),
    multerMiddleware.upload.single("classes"),
    classController.importClasses);

router.post("/create",
    examinationToken.verify,
    privilege.verify(2),
    classController.createClass);

router.put("/update",
    examinationToken.verify,
    privilege.verify(2),
    classController.updateClass);

router.delete("/",
    examinationToken.verify,
    privilege.verify(2),
    classController.deleteClass);

router.delete("/classes",
    examinationToken.verify,
    privilege.verify(2),
    classController.deleteClasses);

router.get("/",
    examinationToken.verify,
    privilege.verify(2),
    classController.getAllClass);

router.get("/search",
    token.verify,
    classController.getClassByKeyword);

router.get("/information",
    token.verify,
    classController.getInformation);

module.exports = router;

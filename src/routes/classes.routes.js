const express = require("express");
const router = express.Router();
const classController = require("../controllers/classes.controllers");
const token = require("../middlewares/tokenLogin.middlewares");
const privilege = require("../middlewares/privilege.middlewares");
const examinationToken = require("../middlewares/tokenExamination.middlewares");
const multerMiddleware = require("../middlewares/multer.middlewares");

router.post("/", examinationToken.verify, multerMiddleware.upload.single("classes"), classController.importClasses);
router.post("/create", examinationToken.verify, classController.createClass);
router.put("/update", examinationToken.verify, classController.updateClass);
// router.delete("/delete", token.verify, role.verify_isAdmin, ClassesController.deleteClasses);
router.get("/", examinationToken.verify, classController.getAllClass);
// router.get("/", ClassesController.getClassByKeyword);
module.exports = router;

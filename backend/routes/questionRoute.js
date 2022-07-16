const express = require("express");
const router = express.Router(); //for handling routing
const questionController = require("../controller/questionController");

router.post("/create", questionController.createQuestion);
router.get("/get",questionController.getAllQuestions);

// router.post("/login", questionController.login);
// router.post("/confirmEmail", questionController.confirmEmail);
// router.post("/sendEmail", questionController.emailSend);

module.exports = router;

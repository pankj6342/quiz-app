const express = require("express");
const router = express.Router(); //for handling routing
const testController = require("../controller/testController");

//pending: implement getCreatedTests
// router.post(`/get/?${testId}`, testController);

router.post("/update", testController.updateTest);
router.get("/get", testController.getAllTest);
router.post("/create", testController.createTest);
module.exports = router;

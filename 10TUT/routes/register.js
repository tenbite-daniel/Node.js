const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerContoler");

router.post("/", registerController.handleNewUser);

module.exports = router;

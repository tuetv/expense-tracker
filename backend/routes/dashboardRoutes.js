const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const {getDashdoardData} = require("../controller/dashboardController");

const router = express.Router();

router.get("/", protect, getDashdoardData);

module.exports = router;
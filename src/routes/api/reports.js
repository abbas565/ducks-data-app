const express = require("express");
const router = express.Router();

// @route   GET api/reports/test
// @desc    Tests report route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Reports Works" }));

module.exports = router;

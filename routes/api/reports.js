const express = require("express");
const router = express.Router();
//const mongoose = require("mongoose");
const passport = require("passport");

// Report model
const Post = require("../../models/Report");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validateReportInput = require("../../validation/report");

// @route   GET api/reports/test
// @desc    Tests report route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Reports Works" }));

// @route   POST api/reports
// @desc    Create report
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateReportInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newReport = new Report({
      fedDate: req.body.fedDate,
      foodType: req.body.foodType,
      where: req.body.where,
      howManyDucks: req.body.howManyDucks,
      foodKind: req.body.foodKind,
      howMuchFood: req.body.howMuchFood,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newReport.save().then(report => res.json(report));
  }
);

// @route   GET api/reports
// @desc    Get reports by user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (req.user.name.toLowerCase() !== "admin") {
        Report.find({ user: req.user.id })
          .sort({ date: -1 })
          .then(reports => {
            res.json(reports);
          })
          .catch(err =>
            res
              .status(404)
              .json({ noreportfound: "No report found for this user" })
          );
      } else {
        Report.find()
          .sort({ date: -1 })
          .then(reports => {
            // Show report
            res.json(reports);
          })
          .catch(err =>
            res.status(404).json({ noreportsfound: "No reports found" })
          );
      }
    });
  }
);
//--------------------

// @route   GET api/reports/:id
// @desc    Get report by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Report.findById(req.params.id)
        .then(report => {
          // Check for report owner
          if (
            report.user.toString() !== req.user.id &&
            req.user.name.toLowerCase() !== "admin"
          ) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          } else {
            // Show report
            res.json(report);
          }
        })
        .catch(err =>
          res
            .status(404)
            .json({ noreportfound: "No report found with that ID" })
        );
    });
  }
);

// @route   DELETE api/reports/:id
// @desc    Delete report
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Report.findById(req.params.id)
        .then(report => {
          // Check for report owner
          //------------
          console.log("User name is:", req.user);
          //---------
          if (req.user.name.toLowerCase() !== "admin") {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          report.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ reportnotfound: "No report found" })
        );
    });
  }
);

module.exports = router;

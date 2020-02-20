var express = require("express");
var router = express.Router();

const Helpers = require("../helpers/helpers.js");

router.get("/", function(req, res, next) {
  console.log("get sprites");
  console.log("result: " + Helpers.getActiveDirectories(`projects/${Helpers.getActiveDirectoryFullName("projects", req.query.id)}`));
  res.send(Helpers.getActiveDirectories(`projects/${Helpers.getActiveDirectoryFullName("projects", req.query.id)}`));
});

router.post("/", function(req, res, next) {
  console.log("post project");
  let result = Helpers.createDirectory("projects", req.query.id);
  if (result) {
    res.send({
      result: "OK",
      message: Helpers.getActiveDirectories("projects")
    });
  } else {
    res.send({
      result: "FAILED",
      message: "Project Already Exists"
    });
  }
});

module.exports = router;

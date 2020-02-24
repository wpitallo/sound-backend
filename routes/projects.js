var express = require("express");
var router = express.Router();

const Helpers = require("../helpers/helpers.js");

router.get("/", function(req, res, next) {
  let results = Helpers.getProjectsData();
  res.send(results);
});

router.post("/", function(req, res, next) {
  console.log("post project");

  let relativePath = "projects/" + req.query.id.toUpperCase();

  let result = Helpers.createDirectory(relativePath);
  if (result) {
    let createProjectResult = Helpers.createProjectData(relativePath, req.query.id);
    if (createProjectResult) {
      res.send({
        status: "ok",
        message: Helpers.getProjectsData()
      });
    } else {
      res.send({
        status: "failed",
        message: "Failed to create project Json"
      });
    }
  } else {
    res.send({
      status: "failed",
      message: "Project Already Exists"
    });
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();

const Helpers = require("../helpers/helpers.js");

router.get("/", function(req, res, next) {
  let returnArray = [];
  let results = Helpers.getDirectories("projects");

  for (let item of results) {
    let projectData = Helpers.readJson("projects/" + item, "projectData.json");
    if (projectData) {
      returnArray.push(projectData);
    }
  }
  res.send(returnArray);
});

router.post("/", function(req, res, next) {
  console.log("post project");
  let result = Helpers.createDirectory("projects", req.query.id);
  if (result) {
    res.send({
      result: "OK",
      message: Helpers.getDirectories("projects")
    });
  } else {
    res.send({
      result: "FAILED",
      message: "Project Already Exists"
    });
  }
});

module.exports = router;

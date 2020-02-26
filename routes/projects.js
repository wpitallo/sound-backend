let projects = require("../entities/projects");

let express = require("express");
let router = express.Router();

router.get("/", function(req, res, next) {
  let results = projects.getProjects();
  res.send(results);
});

router.get("/:projectId", function(req, res, next) {
  console.log("get project by id: " + req.params.projectId);
  let results = projects.getProjectById(req.params.projectId);
  res.send(results);
});

router.post("/", function(req, res, next) {
  console.log("post project");
  let createProjectResult = projects.createProjectData(req.query.projectId);
  res.send(createProjectResult);
});

module.exports = router;

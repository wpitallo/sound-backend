let helpers = require("../helpers/helpers");
const fs = require("fs");
const { join } = require("path");

class Projects {
  static getProjects() {
    let results = helpers.getDirectories("projects");
    let returnArray = [];
    for (let item of results) {
      let projectData = helpers.readJson("projects/" + item, "projectData.json");
      if (projectData) {
        returnArray.push({ id: projectData.id, name: projectData.name });
      }
    }
    return returnArray;
  }

  static getProjectById(projectId) {
    let results = helpers.getDirectories("projects");
    for (let item of results) {
      if (item === projectId.toUpperCase()) {
        return helpers.readJson("projects/" + item, "projectData.json");
      }
    }
  }

  static getProjectsData() {
    let results = helpers.getDirectories("projects");
    let returnArray = [];
    for (let item of results) {
      let projectData = helpers.readJson("projects/" + item, "projectData.json");
      if (projectData) {
        returnArray.push(projectData);
      }
    }
    return returnArray;
  }

  static createProjectData(projectId) {
    let relativePath = "projects/" + projectId.toUpperCase();

    let result = helpers.createDirectory(relativePath);

    if (result) {
      let directoryRelativePath = "projects/" + projectId.toUpperCase();

      let projectData = {
        id: projectId.toUpperCase(),
        name: projectId,
        sprites: []
      };

      console.log("directoryName: " + directoryRelativePath);
      let folderName = join(__dirname, "../" + directoryRelativePath);
      if (fs.existsSync(folderName)) {
        fs.writeFileSync(directoryRelativePath + "/projectData.json", JSON.stringify(projectData));
        return {
          status: "ok",
          message: projectData
        };
      }
      console.log("directory does not exist: " + directoryRelativePath);
      return {
        status: "failed",
        message: "Failed to create project Json"
      };
    } else {
      return {
        status: "failed",
        message: "Project Already Exists"
      };
    }
  }
}

module.exports = Projects;

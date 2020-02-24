const { readdirSync, statSync, fsyncSync } = require("fs");
const fs = require("fs");
const { join } = require("path");

class Helpers {
  uploadFile() {}

  static getProjectsData() {
    let results = Helpers.getDirectories("projects");
    let returnArray = [];
    for (let item of results) {
      let projectData = Helpers.readJson("projects/" + item, "projectData.json");
      if (projectData) {
        returnArray.push(projectData);
      }
    }
    return returnArray;
  }

  static createProjectData(directoryRelativePath, projectId) {
    let projectData = {
      id: `${projectId.toUpperCase()}`,
      name: `${projectId}`,
      sprites: []
    };

    console.log("directoryName: " + directoryRelativePath);
    let folderName = join(__dirname, "../" + directoryRelativePath);
    if (fs.existsSync(folderName)) {
      fs.writeFileSync(directoryRelativePath + "/projectData.json", JSON.stringify(projectData));
      return true;
    }
    console.log("directory does not exist: " + directoryRelativePath);
    return false;
  }

  static getDirectories(relativePath) {
    const absolutePath = join(__dirname, "../" + relativePath);
    return readdirSync(absolutePath).filter(f => statSync(join(absolutePath, f)).isDirectory());
  }

  static readJson(relativePath, fileName) {
    const absolutePath = join(__dirname, "../" + relativePath);
    if (fs.existsSync(absolutePath + "/" + fileName)) {
      console.log(absolutePath + "/" + fileName);
      return JSON.parse(fs.readFileSync(absolutePath + "/" + fileName));
    } else {
      return undefined;
    }
  }

  static getActiveDirectoryFullName(relativePath, directoryId) {
    return this.getDecodedDirectories(relativePath, true).find(x => x.id.toUpperCase() === directoryId.toUpperCase()).fullName;
  }

  static generateGuid() {
    var result, i, j;
    result = "";
    for (j = 0; j < 32; j++) {
      if (j === 8 || j === 12 || j === 16 || j === 20) result = result + "-";
      i = Math.floor(Math.random() * 16)
        .toString(16)
        .toUpperCase();
      result = result + i;
    }
    return result;
  }

  static generateShortGuid() {
    var result, i, j;
    result = "";
    for (j = 0; j < 32; j++) {
      if (j === 8 || j === 12 || j === 16 || j === 20) result = result + "-";
      i = Math.floor(Math.random() * 16)
        .toString(16)
        .toUpperCase();
      result = result + i;
    }
    return result.substring(0, 8);
  }

  static createDirectory(directoryRelativePath) {
    //console.log("directoryName: " + directoryRelativePath);
    let folderName = join(__dirname, "../" + directoryRelativePath);
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
      console.log("created directory: " + directoryRelativePath);
      return true;
    }
    console.log("directory exists: " + directoryRelativePath);
    return false;
  }

  // static getActiveDirectories(relativePath) {
  //   console.log("relativePath: " + relativePath);

  //   return this.getDecodedDirectories(relativePath, true)
  //     .filter(x => x.active === "true")
  //     .map(x => {
  //       x.id = x.id.toUpperCase();
  //       return x;
  //     });
  // }

  // static getDecodedDirectories(relativePath, active) {
  //   let directoryArray = this.getDirectories(relativePath, active);

  //   console.log("directoryArray: " + directoryArray);
  //   let returnArray = [];
  //   //console.log(directoryArray);
  //   for (let item of directoryArray) {
  //     returnArray.push(this.decodeDirectory(item));
  //   }
  //   return returnArray;
  // }

  // static decodeDirectory(name) {
  //   let array = name.split("-");
  //   //console.log(array);
  //   return {
  //     id: array[0],
  //     key: array[1],
  //     active: array[2],
  //     fullName: name
  //   };
  // }
}

module.exports = Helpers;

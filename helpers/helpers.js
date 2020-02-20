const { readdirSync, statSync, fsyncSync } = require("fs");
const fs = require("fs");
const { join } = require("path");

class Helpers {
  static getDirectories(relativePath) {
    const absolutePath = join(__dirname, "../" + relativePath);
    return readdirSync(absolutePath)
      .filter(f => statSync(join(absolutePath, f)).isDirectory())
      .filter(x => x.indexOf("-true") !== -1);
  }

  static readJson(relativePath, fileName) {
    const absolutePath = join(__dirname, "../" + relativePath);
    console.log(absolutePath + "/" + fileName);
    if (fs.existsSync(absolutePath + "/" + fileName)) {
      return fs.readFileSync(absolutePath + "/" + fileName);
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

  static createDirectory(relativePath, directoryName) {
    console.log("directoryName: " + directoryName);
    if (!this.getActiveDirectories(relativePath).find(x => x === directoryName.toUpperCase())) {
      console.log("directoryName: not found ");
      let folderName = relativePath + "/" + directoryName.toUpperCase() + "-" + this.generateShortGuid() + "-true";
      console.log(folderName);
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
        return true;
      }
    }
    console.log("directoryName: found " + this.getActiveDirectories(relativePath).find(x => x === directoryName.toUpperCase()));
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

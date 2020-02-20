const { readdirSync, statSync, fsyncSync } = require("fs");
const fs = require("fs");
const { join } = require("path");

class Helpers {
  static getDirectories(relativePath, active) {
    const absolutePath = join(__dirname, "../" + relativePath);
    // console.log(
    //   readdirSync(absolutePath).filter(f =>
    //     statSync(join(absolutePath, f)).isDirectory()
    //   )
    // );
    if (!active) {
      return readdirSync(absolutePath).filter(f => statSync(join(absolutePath, f)).isDirectory());
    } else {
      return readdirSync(absolutePath)
        .filter(f => statSync(join(absolutePath, f)).isDirectory())
        .filter(x => x.indexOf("-true") !== -1);
    }
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
    if (!this.getActiveDirectories(relativePath).find(x => x === directoryName.toUpperCase())) {
      let folderName = relativePath + "/" + directoryName.toUpperCase() + "-" + this.generateShortGuid() + "-true";
      console.log(folderName);
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
        return true;
      }
    }
    return false;
  }

  static getActiveDirectories(relativePath) {
    return this.getDecodedDirectories(relativePath, true)
      .filter(x => x.active === "true")
      .map(x => {
        return x.id.toUpperCase();
      });
  }

  static getDecodedDirectories(relativePath, active) {
    let directoryArray = this.getDirectories(relativePath, active);
    let returnArray = [];
    //console.log(directoryArray);
    for (let item of directoryArray) {
      returnArray.push(this.decodeDirectory(item));
    }
    return returnArray;
  }

  static decodeDirectory(name) {
    let array = name.split("-");
    //console.log(array);
    return {
      id: array[0],
      key: array[1],
      active: array[2]
    };
  }
}

module.exports = Helpers;

let helpers = require("../helpers/helpers");
let projects = require("./projects");

const fs = require("fs");
const { join } = require("path");

class Sprites {
  static createSpriteData(projectId, spriteId) {
    let projectPath = `projects/${projectId.toUpperCase()}`;
    let directoryRelativePath = `projects/${projectId.toUpperCase()}/${spriteId.toUpperCase()}`;

    let result = helpers.createDirectory(directoryRelativePath);
    if (result) {
      let projectData = projects.getProjectById(projectId);

      let spriteExits = false;
      for (let item of projectData.sprites) {
        if (item.id === spriteId.toUpperCase()) {
          spriteExits = true;
        }
      }

      if (spriteExits === false) {
        let spritesData = {
          id: spriteId.toUpperCase(),
          order: 1,
          name: spriteId,
          sounds: []
        };

        projectData.sprites.push(spritesData);

        console.log("directoryName: " + directoryRelativePath);
        let folderName = join(__dirname, "../" + directoryRelativePath);
        if (fs.existsSync(folderName)) {
          fs.writeFileSync(projectPath + "/projectData.json", JSON.stringify(projectData));
          return {
            status: "ok",
            message: projectData.sprites
          };
        } else {
          console.log("directory does not exist: " + directoryRelativePath);
          return {
            status: "failed",
            message: "directory does not exits - error"
          };
        }
      }
    }
    return {
      status: "failed",
      message: "sprite already exists"
    };
  }
}

module.exports = Sprites;

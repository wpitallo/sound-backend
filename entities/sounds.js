let projects = require("./projects");

const fs = require("fs");

class Sounds {
  static createSoundsData(projectId, spriteId, file) {
    let projectPath = `projects/${projectId.toUpperCase()}`;
    let projectData = projects.getProjectById(projectId);

    let spritesData = projectData.sprites.find(x => x.id === spriteId.toUpperCase());
    let soundsExits = false;

    for (let sound of spritesData.sounds) {
      if (sound.id === file.name.toUpperCase()) {
        soundsExits = true;
      }
    }

    if (soundsExits === false) {
      let soundJson = {
        id: file.name.toUpperCase(),
        order: 1,
        name: file.name,
        src: `/${projectId.toUpperCase()}/${spriteId.toUpperCase()}/${file.name}`,
        presets: []
      };

      spritesData.sounds.push(soundJson);

      fs.writeFileSync(projectPath + "/projectData.json", JSON.stringify(projectData));
      console.log("------------ sound uploaded ---------");
      return {
        status: "ok",
        message: spritesData.sounds
      };
    } else {
      return {
        status: "ok",
        message: spritesData.sounds
      };
    }
  }
}

module.exports = Sounds;

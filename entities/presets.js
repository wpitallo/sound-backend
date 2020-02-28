let projects = require("./projects");
const fs = require("fs");

class Presets {
  static createPresetsData(projectId, spriteId, soundId, presetId) {
    let projectPath = `projects/${projectId.toUpperCase()}`;
    let projectData = projects.getProjectById(projectId);

    let spritesData = projectData.sprites.find(x => x.id === spriteId.toUpperCase());

    console.log(JSON.stringify(spritesData));

    let soundsData = spritesData.sounds.find(x => x.id === soundId.toUpperCase());

    let presetExists = false;

    for (let preset of soundsData.presets) {
      if (preset.id === presetId.toUpperCase()) {
        presetExists = true;
      }
    }

    if (presetExists === false) {
      let presetJson = {
        id: presetId.toUpperCase(),
        order: 1,
        name: presetId,
        effects: []
      };

      soundsData.presets.push(presetJson);

      fs.writeFileSync(projectPath + "/projectData.json", JSON.stringify(projectData));
      console.log("------------ preset uploaded ---------");
      return {
        status: "ok",
        message: soundsData.presets
      };
    } else {
      return {
        status: "failed",
        message: "Preset already exists"
      };
    }
  }
}

module.exports = Presets;

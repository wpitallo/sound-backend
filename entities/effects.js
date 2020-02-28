let projects = require("./projects");
const fs = require("fs");

class Effects {
  static createEffectsData(projectId, spriteId, soundId, presetId, effectId) {
    let projectPath = `projects/${projectId.toUpperCase()}`;
    let projectData = projects.getProjectById(projectId);

    let spritesData = projectData.sprites.find(x => x.id === spriteId.toUpperCase());
    let soundsData = spritesData.sounds.find(x => x.id === soundId.toUpperCase());

    let presetsData = soundsData.presets.find(x => x.id === presetId.toUpperCase());

    let effectExists = false;

    for (let effect of presetsData.effects) {
      if (effect.id === effectId.toUpperCase()) {
        effectExists = true;
      }
    }

    if (effectExists === false) {
      let effectJson = {
        id: effectId.toUpperCase(),
        order: 1,
        name: effectId,
        effects: []
      };

      presetsData.effects.push(effectJson);

      fs.writeFileSync(projectPath + "/projectData.json", JSON.stringify(projectData));
      console.log("------------ effect uploaded ---------");
      return {
        status: "ok",
        message: presetsData.effects
      };
    } else {
      return {
        status: "failed",
        message: "Effect already exists"
      };
    }
  }
}

module.exports = Effects;

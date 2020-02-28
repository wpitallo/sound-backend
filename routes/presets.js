let express = require("express");
let router = express.Router();
let presets = require("../entities/presets");

// router.get("/:projectId/:spriteId", (req, res) => {
//   console.log("get project by id: " + req.params.projectId);
// });

router.post("/", (req, res) => {
  console.log("--> add preset");

  let projectId = req.query.projectId;
  let spriteId = req.query.spriteId;
  let soundId = req.query.soundId;
  let presetId = req.query.presetId;

  console.log("projectId:" + projectId + " spriteId : " + spriteId + " soundId:" + soundId + " presetId : " + presetId);

  let createPresetResult = presets.createPresetsData(req.query.projectId, req.query.spriteId, req.query.soundId, req.query.presetId);
  res.send(createPresetResult);
});

module.exports = router;

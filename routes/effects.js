let express = require("express");
let router = express.Router();
let effects = require("../entities/effects");

// router.get("/:projectId/:spriteId", (req, res) => {
//   console.log("get project by id: " + req.params.projectId);
// });

router.post("/", (req, res) => {
  console.log("--> add effect");
  let projectId = req.query.projectId;
  let spriteId = req.query.spriteId;
  let soundId = req.query.soundId;
  let presetId = req.query.presetId;
  let effectId = req.query.effectId;

  console.log("projectId:" + projectId + " spriteId:" + spriteId + " soundId:" + soundId + " presetId:" + presetId + " effectId:" + effectId);

  let createEffectResult = effects.createEffectsData(req.query.projectId, req.query.spriteId, req.query.soundId, req.query.presetId, req.query.effectId);

  res.send(createEffectResult);
});

module.exports = router;

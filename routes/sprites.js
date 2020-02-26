let sprites = require("../entities/sprites");

let express = require("express");
let router = express.Router();

router.post("/", function(req, res, next) {
  console.log("post sprites");
  let createSpriteResult = sprites.createSpriteData(req.query.projectId, req.query.spriteId);
  console.log("createSpriteResult", createSpriteResult);
  res.send(createSpriteResult);
});

module.exports = router;

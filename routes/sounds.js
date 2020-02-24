var express = require("express");
var router = express.Router();

const { join } = require("path");

const formidable = require("formidable");

const Helpers = require("../helpers/helpers.js");

router.post("/upload", (req, res) => {
  let form = new formidable.IncomingForm();

  let projectId = req.query.projectId;
  let spriteId = req.query.spriteId;

  console.log("projectId:" + projectId + " spriteId : " + spriteId);

  form.parse(req);

  form.on("fileBegin", function(name, file) {
    Helpers.createDirectory(`projects/${projectId}/${spriteId}/`);
    file.path = join(__dirname, `../projects/${projectId}/${spriteId}/` + file.name);
  });

  form.on("file", function(name, file) {
    console.log("name", name);
    console.log("file", file);

    let soundJson = {
      id: "SOUND1",
      order: 1,
      name: "Sound1",
      src: "/sounds/as_Base_Background.mp3",
      presets: []
    };

    console.log("Uploaded " + file.name);
  });
});

module.exports = router;

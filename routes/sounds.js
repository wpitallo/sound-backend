let express = require("express");
let router = express.Router();
const { join } = require("path");
const formidable = require("formidable");
const Helpers = require("../helpers/helpers.js");
let sounds = require("../entities/sounds");

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
    let result = sounds.createSoundsData(projectId, spriteId, file);

    console.log("Uploaded " + file.name);
  });
});

module.exports = router;

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var projectsRouter = require("./routes/projects");
var spritesRouter = require("./routes/sprites");
var soundsRouter = require("./routes/sounds");
var presetsRouter = require("./routes/presets");
var effectsRouter = require("./routes/effects");

var app = express();

// var io = require('socket.io')(server);

// io.set('origins', '*:*');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "*");
  res.header("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, X-Requested-With, Range");
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/sprites", spritesRouter);
app.use("/sounds", soundsRouter);
app.use("/presets", presetsRouter);
app.use("/effects", effectsRouter);

app.use("/sound-files", express.static(path.join(__dirname, "/projects")));

var listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});

import express from "express";

const HTTP_PORT = 8080;

var app;

function init() {
  app = express();
  app.use(express.static("app"));
  app.listen(HTTP_PORT, function() {
    console.log("Listening on Port " + HTTP_PORT);
  });
}

init();
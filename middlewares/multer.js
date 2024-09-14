const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const middlewares = (app) => {
  app.use(express.static(path.join(__dirname, "../public")));
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};

module.exports = middlewares;

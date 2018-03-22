"use strict";

const fs = require("fs"),
  log = require("fancy-log"),
  path = require("path"),
  argv = require("yargs")
  .alias("r", "root")
  .argv;
  
  module.exports = function () {
    const printUsage = function () {
      log("Configuration input from command line:");
      log("-------------------------------------------");
      log("\t-r | --root sets instance root folder, ex. c:\\websites\mysite");
      log("-------------------------------------------");
    }
    const defaultConfig = {
      root: path.resolve("."),
      websiteRoot: function () {
        return this.root + "\\Website";
      },
    };
    var config = {}
    const setConfig = function () {
      const userConfig = fs.existsSync("./gulp-config.js.user") ? require("./gulp-config.js.user") : {};
      config = Object.assign(config, defaultConfig, userConfig, argv);
    };
    printUsage();
    setConfig();
    log("\nCurrent config:");
    log(config);
    log("-------------------------------------------\n");
    return config;
  }();
"use strict";

const gulp = require("gulp"),
  path = require("path"),
  config = require("../../gulp-config.js");

const publishScripts = () => {
  return gulp.src("./src/Project/**/code/Dist/js/**/*.js")
    .pipe(gulp.dest((file) => {
      file.path = path.join(config.websiteRoot(), "Dist/js/") + path.basename(file.path);
      console.log("published: " + file.path);
      return file.base;
    }));
}

gulp.task("publish-scripts", publishScripts);

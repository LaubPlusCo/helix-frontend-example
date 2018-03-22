"use strict";

const gulp = require("gulp"),
  path = require("path"),
  config = require("../../gulp-config.js");

const publishStyles = () => {
  return gulp.src("./src/Project/**/code/Dist/css/**/*.css")
    .pipe(gulp.dest((file) => {
      file.path = path.join(config.websiteRoot(), "Dist/css/") + path.basename(file.path);
      console.log("published: " + file.path);
      return file.base;
    }));
}

gulp.task("publish-styles", publishStyles);

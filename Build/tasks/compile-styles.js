"use strict";

const gulp = require("gulp"),
  path = require("path"),
  fg = require("fast-glob"),
  sass = require("gulp-sass");


const styleFolders = () => fg.sync(["./src/{Feature,Foundation,Project/Common}/**/code/Styles"], {
  "absolute": true,
  "nocase": true,
  onlyDirectories: true,
  onlyFiles: false,
  unique: true,
  markDirectories: true
}).concat([ path.resolve("./node_modules/") ]);

const compileStyles = () => {
  var sf = styleFolders();
  return gulp.src(["./src/Project/**/code/Styles/*.scss"], ["!./src/Project/**/code/Styles/_*.scss"])
    .pipe(sass({
      includePaths: sf,
    })).on("error", sass.logError)
    .pipe(gulp.dest((file) => {
      file.path = path.join(path.dirname(path.dirname(file.path)), "Dist/css/") + path.basename(file.path);
      console.log("compiled: " + file.path);
      return file.base;
    }));
}

gulp.task("compile-styles", compileStyles);

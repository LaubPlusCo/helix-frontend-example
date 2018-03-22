"use strict";

const gulp = require("gulp"),
    runSequence = require("run-sequence");

const watchStyles = () => { gulp.watch(["./src/{Feature,Foundation,Project}/**/code/Styles/*.scss"], () => { return runSequence("compile-styles", "publish-styles") }); };

gulp.task("watch-styles", watchStyles);


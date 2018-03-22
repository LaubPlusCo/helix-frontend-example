"use strict";

const gulp = require("gulp"),
    runSequence = require("run-sequence");

const watchScripts = () => { gulp.watch(["./src/{Feature,Foundation,Project}/**/code/Scripts/*.js"], () => { return runSequence("compile-scripts", "publish-scripts") }); };

gulp.task("watch-scripts", watchScripts);


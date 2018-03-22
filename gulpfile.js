"use strict";
/**
 * 
 * @author Anders Laub, @anderslaub - contact@laubplusco.net
 * 
 * Simple Gulp tasks that helps build scss and js bundles in a Sitecore Helix solution.
 */

const gulp = require("gulp"),
  runSequence = require("run-sequence"),
  requireDir = require('require-dir');

requireDir('./build/tasks', {
  recurse: true
});

gulp.task("watch", [ "watch-styles", "watch-scripts" ]);
gulp.task("publish", [ "publish-styles", "publish-scripts" ]);
gulp.task("compile", [ "compile-styles", "compile-scripts" ]);
gulp.task("default", (callback) => { return runSequence("compile", "publish", "watch", callback); });

/**
 * 
 * @author Anders Laub, @anderslaub - contact@laubplusco.net
 * 
 * Simple Gulp tasks that helps build scss and js bundles in a Sitecore Helix solution.
 */

const gulp = require("gulp"), 
    requireDir = require('require-dir');

requireDir('./build/tasks', { recurse: true });

gulp.task("watch", [ "watch-styles", "watch-scripts" ]);
gulp.task("build", [ "compile-styles", "compile-scripts" ]);

gulp.task("default", [ "build", "watch" ]);
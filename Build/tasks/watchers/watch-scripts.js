const gulp = require("gulp");
const watchScripts = () => { gulp.watch(["src/**/code/Scripts/*.js"], ["compile-scripts"]); };

gulp.task("watch-scripts", watchScripts);


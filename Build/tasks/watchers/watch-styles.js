const gulp = require("gulp");
const watchStyles = () => { gulp.watch(["src/**/code/Styles/*.scss"], ["compile-styles"]); };

gulp.task("watch-styles", watchStyles);


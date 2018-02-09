const gulp = require("gulp"),
    path = require("path"),
    fg = require("fast-glob"),
    sass = require("gulp-sass");


const styleFolders = fg.sync(["./src/{Feature,Foundation,Project/Common}/**/code/Styles"], {
    "absolute": true,
    "nocase": true,
    onlyDirectories: true,
    onlyFiles: false,
    unique: true,
    markDirectories: true
}).concat(["./node_modules"]);

const styles = () => {
    var sf = styleFolders;
    return gulp.src(["./src/Project/**/code/Styles/*.scss"], ["!./src/Project/**/code/Styles/_*.scss"])
        .pipe(sass({
            includePaths: sf,
        })).on("error", sass.logError)
        .pipe(gulp.dest((file) => {
            file.path = path.join(path.dirname(path.dirname(file.path)), "dist/css/") + path.basename(file.path);
            console.log(file.base + file.path);
            return file.base;
        }));
}

gulp.task("compile-styles", styles);
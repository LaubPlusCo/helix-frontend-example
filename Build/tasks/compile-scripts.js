const gulp = require("gulp"),
    path = require("path"),
    fg = require("fast-glob"),
    webpack = require("webpack");

const createModuleMap = () => {
    let scriptDirs = fg.sync(["./src/{Feature,Foundation}/**/code/Scripts"], {
        "absolute": true,
        "nocase": true,
        onlyDirectories: true,
        onlyFiles: false,
        unique: true,
        markDirectories: true
    });
    map = {}
    for (let i = 0; i < scriptDirs.length; i++) {
        let moduleFolder = path.dirname(path.dirname(scriptDirs[i]));
        let moduleName = `${path.basename(path.dirname(moduleFolder))}-${path.basename(moduleFolder)}`;
        map[moduleName] = scriptDirs[i];
    }
    return map;
}

const createWebPackConfig = (inputFile, map) => {
    let outputFolder = path.resolve(path.join(path.dirname(path.dirname(inputFile)), "dist/js/"));
    let outputFile = path.basename(inputFile);
    return {
        entry: inputFile,
        output: {
            path: outputFolder,
            filename: outputFile
        },
        resolve: {
            modules: [
                "node_modules",
                path.resolve("./src/")
            ],
            extensions: [".js", ".json", ".ts"],
            alias: map
        }
    }
}

const build = (config) => {
    return new Promise(resolve => webpack(config, (err, stats) => {
        if (err) console.log('Webpack', err)
        console.log(stats.toString({ /* stats options */ }))
        resolve();
    }))
}

const compileSriptBundles = () => {
    //TODO: Perhaps change to gulp vinyl stream instead of fast glob..
    let bundleFiles = fg.sync(["./src/Project/**/code/Scripts/*-Bundle.js"], {
        "absolute": false,
        "nocase": true,
        onlyDirectories: false,
        onlyFiles: true,
        unique: true
    });
    var modulesMap = createModuleMap();
    for (let i = 0; i < bundleFiles.length; i++) {
        build(createWebPackConfig(bundleFiles[i], map));
    }
}

gulp.task("compile-scripts", compileSriptBundles);
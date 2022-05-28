const { series, src, dest, watch, task, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const prefixer = require("autoprefixer");

// SETTINGS:

// TASKS:
task("css-dev", function () {
	return src("src/scss/app.scss")
		.pipe(sass())
		.pipe(postcss([prefixer]))
		.pipe(dest("public/"));
});

task("watcher", function () {
	watch("src/scss/**/*.scss", series("css-dev"));
});

exports.default = series("watcher");

// Gulp Plugins:
const { task, src, dest, series, parallel, watch } = require("gulp");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const notifier = require("gulp-notify");

// CSS & SASS
const prefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass")(require("sass"));

// Images Processing
const imagemin = require("gulp-imagemin");
const imageWebp = require("gulp-webp");
const imageAvif = require("gulp-avif");

//----------------------------------------------------------------
// ? GULP TASKS:
//----------------------------------------------------------------

// Processing Sass and Css Files:
function css() {
	return src("src/scss/index.scss")
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss([prefixer()]))
		.pipe(sourcemaps.write("."))
		.pipe(dest("public/css"))
		.pipe(notifier("Gulp CSS task is done!"));
}

// Minifying Images:
function imgminifier() {
	console.log("Gulp Image Minifier task is done!");
}

// Watching all development changes:
function watcher() {
	watch("src/scss/**/*.scss", css);
	watch("src/img/**/*.{jpg,png,jpeg,gif}", imgminifier);
}

module.exports.default = series(css, watcher);

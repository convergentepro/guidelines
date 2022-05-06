// @ts-ignore
require('dotenv').config();
const {src, dest, watch, series, parallel} = require('gulp');
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const bsync = require('browser-sync').create();
const {GULP_ENV} = process.env;

// Converting from .scss to .css:
function scss() {
    return src('./src/scss/index.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefix())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./public/assets/'));
}

// Watching Mode:
function watchTask() {
    watch('./src/scss/**/*.scss', scss);
}

// Exec default Gulp Task:
exports.default = series(parallel(scss), watchTask);

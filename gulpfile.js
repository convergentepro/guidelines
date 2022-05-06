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
function scssToCss() {
    return src('./src/scss/index.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'expanded',
            })
        )
        .pipe(prefix())
        .pipe(minify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./public/assets/'));
}

// minify js
function jsminify() {
    return src('./src/main.js')
        .pipe(sourcemaps.init())
        .pipe(
            terser({
                sourceMap: true,
                ecma: 6,
                ie8: true,
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./public/assets/')); // change to your final/public directory
}

function initServe() {
    bsync.init({
        server: {
            baseDir: './',
            index: 'index.html',
        },
        browser: 'default',
        cors: true,
        files: ['./public/**/*.*'],
        host: 'localhost',
        injectChanges: true,
        logLevel: 'info',
        port: 3000,
        open: true,
        notify: true,
    });
}

// Watching Mode:
function watchTask() {
    watch('./src/scss/**/*.scss', scssToCss);
    watch('./src/**/*.js', jsminify);
    watch('./index.html').on('change', bsync.reload);
}

// Exec default Gulp Task:
exports.default = series(parallel(scssToCss, jsminify), initServe, watchTask);

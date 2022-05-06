// @ts-ignore
const {src, dest, watch, series, parallel} = require('gulp');
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');
// const dartSass = require('sass');
// const gsass = require('gulp-sass');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

// SETTINGS
const PATHS = {
    source: {
        scss: 'src/scss',
        css: 'src/scss/',
        js: 'src/**/*.{js,ts,jsx,tsx}',
        images: 'src/img',
        fonts: 'src/fonts/**/*.{ttf,woff,woff2}',
        public: 'public/**/*',
    },
    dist: {
        css: 'dist/css',
        js: 'dist/js',
        images: 'dist/images',
        fonts: 'dist/fonts',
    },
};

// Converting from .scss to .css:
function scssToCss() {
    return src([PATHS.source.scss + '/*.scss', PATHS.source.scss + '/*.css'])
        .pipe(sourcemaps.init())
        .pipe(sass({sourceMap: true, outputStyle: 'nested'}))
        .pipe(
            prefix({
                browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4.4'],
                cascade: true,
                flexbox: true,
            })
        )
        .pipe(
            minify({
                level: 2,
                sourceMap: true,
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(dest(PATHS.dist.css));
}

// Minify and Optmize all Images:
function imageOptimization() {
    return src(PATHS.source.images + '/**/*.{jpg,png,jpeg}') // change to your source directory
        .pipe(
            imagemin([
                imagemin.mozjpeg({quality: 85, progressive: true}),
                imagemin.optipng({
                    optimizationLevel: 5,
                    bitDepthReduction: true,
                    paletteReduction: true,
                }),
                imagemin.svgo(),
                imagemin.gifsicle({interlaced: true}),
            ])
        )
        .pipe(dest(PATHS.dist.images)); // change to your final/public directory
}

// Converting all jpg and png images to Webp Version:
function webpImage() {
    return src(PATHS.dist.images + '/*.{jpg,png,jpeg}')
        .pipe(imagewebp())
        .pipe(dest(PATHS.dist.images + '/webp'));
}

// minify js
function jsminify() {
    return src(PATHS.source.js)
        .pipe(sourcemaps.init())
        .pipe(
            terser({
                safari10: true,
                keep_classnames: true,
                keep_fnames: true,
                sourceMap: true,
                toplevel: true,
                warnings: true,
                output: {
                    beautify: true,
                    comments: false,
                    semicolons: true,
                    wrap_iife: true,
                },
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(dest(PATHS.dist.js)); // change to your final/public directory
}

// Watching Mode:
function watchTask() {
    // @ts-ignore
    watch(PATHS.source.scss, series(scssToCss, minify));
    watch(PATHS.source.js, jsminify);
    watch(PATHS.source.images + '/**/*.{jpg,png,jpeg}', imageOptimization);
    watch(PATHS.dist.images + '/*.{jpg,png,jpeg}', webpImage);
}

// Exec default Gulp Task:
exports.default = series(
    scssToCss,
    jsminify,
    imageOptimization,
    webpImage,
    watchTask
);

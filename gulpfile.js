const {parallel, src, dest, series} = require('gulp');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const bsync = require('browser-sync')(create());
const cacheBust = require('gulp-cache-bust');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
const notifier = require('gulp-notifier');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

const {
    CONLOG,
    DIRNAME,
    NODE_PORT,
    NODE_ENV,
    NODE_HOST,
} = require('./src/config/');

// VARIABLES LOCALS:
const PATHS = {};

// function buildStyles() {
//     return src(`${entryDirectory}scss/**/${extensions[0]}`)
//         .pipe(sourcemaps.init())
//         .pipe(plumber())
//         .pipe(sass().on('error', sass.logError))
//         .pipe(postcss([autoprefixer()]))
//         .pipe(sourcemaps.write('.'))
//         .pipe(dest(`${outputDirectory}css/`))
//         .pipe(server.stream());
// }

// // TASK: Javascript Building:
// function buildScripts() {
//     return src(`${entryDirectory}js/**/${extensions[1]}`)
//         .pipe(sourcemaps.init())
//         .pipe(babel(babelPresets, babelPlugins))
//         .pipe(sourcemaps.write('.'))
//         .pipe(dest(`${outputDirectory}js/`))
//         .pipe(server.stream());
// }

// TASK: Watching Mode Running:
// function watching() {
//     const server = bsync.init({
//         server: `${publicPath}`,
//         port: PORT,
//         injectChanges: true,
//         logFileChanges: true,
//         timestamps: true,
//         serveStatic: ['./public'],
//         notify: true,
//     });
//     // SCSS => CSS
//     watch([`${entryDirectory}/scss/**/${extensions[0]}`], buildStyles);

//     // JS input => Javascript output
//     watch([`${entryDirectory}/**/${extensions[1]}`], buildScripts).on(
//         'change',
//         server.reload
//     );

//     // HTML input => HTML output
//     watch([`${entryDirectory}/**/${extensions[3]}`]).on(
//         'change',
//         server.reload
//     );
// }

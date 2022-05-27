import prefixer from "autoprefixer";
import cssnano from "cssnano";
import { dest, series, src, watch } from "gulp";
import plumber from "gulp-plumber";
// CSS & SASS:
import postcss from "gulp-postcss";
import gsass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import nodesass from "sass";
const sass = gsass(nodesass);

// SETTINGS:
let DEVELOPMENT = true;

// Process CSS & SASS

function cssProcess() {
	if (DEVELOPMENT === true) {
		return src("./src/scss/app.scss")
			.pipe(plumber())
			.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(postcss([prefixer]))
			.pipe(sourcemaps.write("."))
			.pipe(dest("./public/static/"));
	}

	return src("./public/static/app.css")
		.pipe(plumber())
		.pipe(postcss([cssnano()]))
		.pipe(dest("dist/static/"));
}

function watchFiles() {
	watch("src/scss/**/*.scss", cssProcess);
}

export default series(DEVELOPMENT === true ? watchFiles : cssProcess);

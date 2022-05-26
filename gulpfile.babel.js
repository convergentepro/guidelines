// Gulp Plugins:

import prefixer from "autoprefixer";
import { dest, series, src, watch } from "gulp";
import babel from "gulp-babel";
import plumber from "gulp-plumber";
// CSS & SASS:
import postcss from "gulp-postcss";
import gsass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import nodesass from "sass";

const sass = gsass(nodesass);

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
		.pipe(dest("public/css"));
}

function js() {
	return src("src/app.js")
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				filename: "index.js",
				ignore: ["node_modules"],
				presets: ["@babel/preset-env"],
				plugins: ["@babel/plugin-transform-runtime"],
			})
		)
		.pipe(dest("public/js"));
}

// Watching all development changes:
function dev() {
	watch("src/scss/**/*.scss", css);
	watch("src/**/*.{js,ts,jsx,tsx}", js);
}

export default series(js, css);

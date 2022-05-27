import prefixer from "autoprefixer";
import server from "browser-sync";
import cssnano from "cssnano";
import { dest, series, src, watch } from "gulp";
import plumber from "gulp-plumber";
// CSS & SASS:
import postcss from "gulp-postcss";
import purgecss from "gulp-purgecss";
import gsass from "gulp-sass";
import maps from "gulp-sourcemaps";
import nodesass from "sass";

const sass = gsass(nodesass);

// SETTINGS:
let DEVELOPMENT = true;
server.create();
// Process CSS & SASS

function cssProcess() {
	if (DEVELOPMENT === true) {
		return src("./src/scss/app.scss")
			.pipe(plumber())
			.pipe(maps.init())
			.pipe(sass())
			.pipe(postcss([prefixer]))
			.pipe(maps.write("."))
			.pipe(dest("./public/"))
			.pipe(
				server.stream({
					once: true,
					match: "**/*.css",
				})
			);
	}

	return src("./public/app.css")
		.pipe(plumber())
		.pipe(maps.init())
		.pipe(postcss([cssnano()]))
		.pipe(maps.write("."))
		.pipe(dest("dist/"))
		.pipe(server.stream());
}

function cssCleaner() {
	return src("public/app.css")
		.pipe(
			purgecss({
				content: ["./public/*.html"],
				output: "./public/*.css",
			})
		)
		.pipe(dest("./dist/"));
}

function watchFiles() {
	server.init({
		watch: true,
		port: 5000,
		injectChanges: true,
		logLevel: "debug",
		minify: true,
		notify: true,
		files: ["./public/*.html", "./public/*.css"],
		open: false,
		server: {
			baseDir: "./public/",
			index: "./index.html",
		},
	});

	watch("src/scss/**/*.scss", cssProcess);
	watch("public/*.html", server.reload);
}

export default series(
	DEVELOPMENT === true ? watchFiles : cssProcess,
	cssCleaner
);

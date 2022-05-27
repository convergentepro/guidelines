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
			.pipe(dest("./public/static/"))
			.pipe(server.stream());
	}

	return src("./public/static/app.css")
		.pipe(plumber())
		.pipe(maps.init())
		.pipe(postcss([cssnano()]))
		.pipe(maps.write("."))
		.pipe(dest("dist/static/"));
}

function cssCleaner() {
	return src("public/static/app.css")
		.pipe(
			purgecss({
				content: ["./*.html", "./public/*.html"],
			})
		)
		.pipe(dest("./dist/"));
}

function htmlprocess() {
	return src("./index.html")
		.pipe(plumber())
		.pipe(dest("./public/"))
		.pipe(server.stream());
}

function watchFiles() {
	server.init({
		watch: true,
		port: 4000,
		injectChanges: true,
		logConnections: true,
		logLevel: "info",
		serveStatic: ["./public"],
		browser: "brave",
		minify: DEVELOPMENT ? false : true,
		notify: true,
		open: false,
		startPath: "/",
		server: {
			baseDir: "./",
			index: "./index.html",
		},
	});

	watch("src/scss/**/*.scss", cssProcess);
	watch(["public/*.html", "./index.html"], htmlprocess);
}

export default series(
	DEVELOPMENT === true ? watchFiles : cssProcess,
	htmlprocess,
	cssCleaner
);

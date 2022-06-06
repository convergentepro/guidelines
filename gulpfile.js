// From local repository to remote repository:

const babel = require('gulp-babel')
const concat = require('gulp-concat')
const cssnano = require('cssnano')
const path = require('path')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const prefixer = require('autoprefixer')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const terser = require('gulp-terser')
const tscript = require('gulp-typescript')
const { nanoid } = require('nanoid')
const { series, src, dest, watch, parallel } = require('gulp')
const { stream, reload, init } = require('browser-sync').create()

// * Create a chunkHash to namespace or filenames:
const hasher = nanoid().replace('-,_,.', '')

// * Working with SCSS and CSS in Development Mode:
function compilecss() {
	return src('./src/scss/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([prefixer()]))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./public/static'))
		.pipe(stream())
}

// * Typescript Task:
function compilets() {
	return src('./src/index.ts')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(tscript())
		.pipe(
			babel({
				presets: ['@babel/preset-env'],
				plugins: [
					'@babel/plugin-transform-runtime',
					'@babel/plugin-proposal-class-properties',
					'@babel/plugin-proposal-function-bind',
					'@babel/plugin-syntax-dynamic-import',
				],
				ignore: ['node_modules'],
			})
		)
		.pipe(sourcemaps.write())
		.pipe(dest('./public/assets', { overwrite: true }))
		.pipe(stream())
}

// * Running Up Server with BrowserSync + Watcher:
function server() {
	init({
		server: {
			baseDir: './public',
			index: 'index.html',
		},
		injectChanges: true,
		watch: true,
		watchOptions: {
			depth: 1,
			persistent: true,
		},
		port: 3000,
		logLevel: 'debug',
		open: false,
		notify: true,
		reloadOnRestart: true,
	})
}

// * Watching Files with Gulp Watch:
function watching() {
	watch('./src/scss/**/*.scss', compilecss)
	watch(['./src/*.ts'], compilets).on('change', reload)
	watch('./public/*.html').on('change', reload)
}

// * Exports:
exports.serve = server
exports.default = series(parallel(compilecss, compilets), server, watching)

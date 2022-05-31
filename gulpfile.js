const { series, src, dest, watch, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const prefixer = require('autoprefixer')
const plumber = require('gulp-plumber')
const { stream, reload, init } = require('browser-sync').create()
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const terser = require('gulp-terser')
const concat = require('gulp-concat')
const tscript = require('gulp-typescript')
const { nanoid } = require('nanoid')
const cssnano = require('cssnano')
const path = require('path')

// ? Settings:
const hasher = nanoid().replace('-,_', '')

// CSS and SCSS in Development Mode:
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
		.pipe(
			tscript({
				target: 'es5',
				module: 'es6',
				moduleResolution: 'node',
				sourceMap: true,
				outDir: './public',
				isolatedModules: true,
			})
		)
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
		.pipe(dest('./public/static', { overwrite: true }))
		.pipe(stream())
}

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

// Watcher Gulp Task
function watching() {
	watch('./src/scss/**/*.scss', compilecss)
	watch(['./src/*.ts'], compilets).on('change', reload)
	watch('./public/*.html').on('change', reload)
}

// ? Exports:
exports.serve = server
exports.default = series(parallel(compilecss, compilets), server, watching)

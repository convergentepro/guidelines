const { series, src, dest, watch, task, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const prefixer = require("autoprefixer");
const plumber = require('gulp-plumber');
const { stream, reload } = require( "browser-sync" );
const babel = require( "gulp-babel" );
const sourcemaps = require('gulp-sourcemaps');
const terser = require( "gulp-terser" );
const concat = require( 'gulp-concat' );
const tscript = require('gulp-typescript');
const { nanoid } = require('nanoid');
const cssnano = require( "cssnano" );
const copyFiles = require( 'gulp-copy' );
const fs = require( 'fs/promises' );
const path = require('path');
// Gulp Task Functions
const hasher = nanoid().replace( '-,_', '' );

// CSS and SCSS in Development Mode:
function compilecss(){
	return src( './src/scss/app.scss')
		.pipe( plumber() )
		.pipe(sourcemaps.init())
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( postcss( [prefixer()] ) )
		.pipe(sourcemaps.write('.'))
		.pipe( dest( './public/static', { 
			overwrite: true,
			
		} ) )
		.pipe( stream() );
}

 
function compilets() {
	return src( './src/index.ts' )
		.pipe( plumber() )
		.pipe( sourcemaps.init() )
		.pipe( tscript( { 
			target: 'es5',
			module: 'es6',
			moduleResolution: 'node',
			sourceMap: true,

		} ) )
				.pipe( babel( {
			presets: [
				"@babel/preset-env"
			],
			plugins: [
				"@babel/plugin-transform-runtime",
				"@babel/plugin-proposal-class-properties",
				"@babel/plugin-proposal-function-bind",
				"@babel/plugin-syntax-dynamic-import"
			],
			ignore: ['node_modules'],
		} ) )
		.pipe( sourcemaps.write() )
		.pipe( dest( './public/static', { overwrite: true } ) )
		.pipe( stream( { match: '**/*.ts' }) );
 }


 //----------------------------------------------------------------
 // BUILDING TASKS:  

//  Building Css: 
function cssBuild() {
	return src( './public/app.css' )
		.pipe( postcss( [cssnano()] ) )
		.pipe(concat(`app.${hasher}.css`))
		.pipe(dest('dist/assets/'))
}

//  Building Css: 
function jsBuild() {
	return src( './public/*.js' )
		.pipe( terser({ toplevel: true, ie8: true, sourceMap: true}))
		.pipe(concat(`main.${hasher}.js`))
		.pipe(dest('dist/assets/'))
}

// Process Html 
function compilehtml ()
{ 

	return fs.copyFile( path.join(__dirname, './src/index.html'), './public/index.html')
}

// Watcher Gulp Task
function watching() {
	watch("./src/scss/**/*.scss", compilecss);
	watch("./src/*.{js,ts}", compilets).on("change", reload);
	watch("./*.html", compilehtml).on("change", reload);
}



exports.html = compilehtml;
exports.ts = compilets;
exports.build = series(cssBuild, jsBuild);
exports.default = series(compilecss, compilets, compilehtml);
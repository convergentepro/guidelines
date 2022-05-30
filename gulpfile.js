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

// SETTINGS:

const DEVELOPMENT = "development";
const PRODUCTION = "production";
const hasher = nanoid().replace( '-,_', '' );

// Gulp Task Functions
function compileDevCss (){
	return src( './src/scss/app.scss' )
		.pipe( plumber() )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( postcss( [prefixer()] ) )
		.pipe( dest( './public/' ) )
		.pipe( stream() );
}

function compileDevJs ()
{
	
	return src( './src/**/*.js' )
		.pipe( plumber() )
		.pipe(sourcemaps.init())
		.pipe( babel( {
			presets: [],
			code: true,
			ignore: ['node_modules']
		} ) )
		// .pipe( terser( {
		// 	toplevel: true,
		// 	ie8: true,
		// 	output: {
		// 		ecma: 5
		// 	}
		// } ) )
		.pipe( concat( `main.js` ) )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( dest( './public/' ) )
 }


//  Building Css: 
function buildCss() {
	return src( './public/app.css' )
		.pipe( postcss( [cssnano()] ) )
		.pipe(concat(`app.${hasher}.css`))
		.pipe(dest('dist/'))
}



// Watcher Gulp Task
function watching() {
	watch("./src/scss/**/*.scss", compileDevCss);
	watch("./src/*.{js,ts}", compileDevJs).on("change", reload);
}

exports.build = series(buildCss);
exports.css = compileDevCss;
exports.js = compileDevJs;
exports.default = (DEVELOPMENT) ? series(compileDevCss, compileDevJs, watching) : series(buildCss);

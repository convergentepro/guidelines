// const autoprefixer = require( 'autoprefixer' );
// const purgecssPlugin = require( 'purgecss' );


module.exports = {
   plugins: [
      require( 'autoprefixer' )( {
         cascade: true,
         grid: true,
      }) ,
      // @ts-ignore
      require('purgecss')({
         content: ['./**/*.html'],
      })
   ]

}
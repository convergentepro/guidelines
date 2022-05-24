const path = require('path');
const {DIRNAME} = require('./src/helpers');

// ENVIROMENTS VARIABLES:
// SETTINGS:

console.log('Webpack Development Configuration!');
module.exports = {
    name: 'Webpack Development Configuration',
    entry: ['./src/main.js', './src/scss/index.scss'],
    output: {
        path: DIRNAME('dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-function-bind',
                            '@babel/plugin-syntax-dynamic-import',
                        ],
                    },
                },
            },
        ],
    },
};

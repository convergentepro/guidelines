const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
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
                        plugins: ['@babel/plugin-syntax-dynamic-import'],
                    },
                },
            },

            {
                test: /\.(html)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },

            {
                test: /\.(svelte)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'svelte-loader',
                    },
                ],
            },
        ],
    },

    plugins: [
        new HtmlPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
            cache: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                html5: true,
            },
            title: 'Convergente Guidelines',
            scriptLoading: 'defer',
        }),
    ],
};

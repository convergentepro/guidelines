// const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {scss} = require('svelte-preprocess');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const {NODE_ENV, WEBPACK_HOSTNAME, WEBPACK_PORT} = require('./src/config');
// Locals Imports:
const {CLOG, DIRNAME} = require('./src/helpers');

// SETTINGS DECLARATIONS:
const DEVELOPMENT = NODE_ENV;
const PORT = WEBPACK_PORT;
const HOST = WEBPACK_HOSTNAME;

CLOG('Webpack running with ES6, imports statements!');

module.exports = {
    entry: [
        'webpack-hot-middleware/client/index.js?path=/__webpack_hmr&timeout=20000&reload=true',
        './src/main.js',
        './src/scss/index.scss',
    ],
    output: {
        path: DIRNAME('dist'),
        filename: DEVELOPMENT ? '[name].js' : '[name].[contenthash].js',
        //   assetModuleFilename: 'assets/images/[hash][ext][query]',
    },
    resolve: {
        extensions: [
            '*',
            '.mjs',
            '.js',
            '.ts',
            '.scss',
            '.css',
            '.hbs',
            '.html',
            '.json',
            '.svelte',
        ],
        mainFields: ['svelte', 'browser', 'module', 'main'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|mjs)$/,
                exclude: /node_modules\/(?!svelte)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-proposal-function-bind',
                            '@babel/plugin-proposal-class-properties',
                        ],
                    },
                },
            },
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true,
                        hotReload: true,
                        preprocess: [scss()],
                    },
                },
            },
            {
                // Rule to work with CSS or SCSS Files:
                test: /\.(scss|css|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            cache: true,
            filename: 'index.html',
            chunksSortMode: 'auto',
            template: DIRNAME('./src/index.html'),
            inject: 'body',
            scriptLoading: 'defer',
            publicPath: '/',
            title: 'Convergente Guidelines',
            minify: DEVELOPMENT ? false : true,
        }),
        new MiniCssExtractPlugin({
            filename: DEVELOPMENT ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: DEVELOPMENT ? '[id].css' : '[id].[contenthash].css',
            inject: true,
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                exclude: /node_modules/,
                terserOptions: {
                    compress: DEVELOPMENT ? false : true,
                    ie8: true,
                    keep_classnames: true,
                    keep_fnames: true,
                    sourceMap: true,
                    format: {
                        braces: true,
                        comments: false,
                        semicolons: true,
                        shorthand: true,
                        wrap_iife: true,
                        webkit: true,
                    },
                },
            }),
        ],
    },
};

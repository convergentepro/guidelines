// IMPORTS:
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
// Local Imports:
const {DIRNAME} = require('./src/helpers/index.js');

module.exports = {
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client/index.js?path=/__webpack_hmr&timeout=20000&reload=true',
        './src/index.js',
        './src/scss/index.scss',
    ],

    output: {
        path: DIRNAME('public'),
        publicPath: '/',
        filename: 'js/main.js',
        chunkFilename: '[name].js',
        clean: true,
    },

    target: 'web',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-function-bind',
                                '@babel/plugin-syntax-dynamic-import',
                            ],
                        },
                    },
                ],
            },

            {
                test: /\.(scss|css)$/i,
                use: [MiniCssExtract.loader, 'css-loader', 'sass-loader'],
            },

            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minify: true,
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpack({
            template: DIRNAME('/index.html'),
            filename: 'index.html',
            inject: 'body',
            scriptLoading: 'defer',
        }),
        new MiniCssExtract({
            filename: 'css/main.css',
            chunkFilename: '[id].css',
            insert: 'head',
            ignoreOrder: true,
        }),
    ],

    devServer: {
        publicPath: DIRNAME('/public/'),
        hot: true,
        port: 9000,
        hmr: true,
        historyApiFallback: true,
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css', '.html'],
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                exclude: /node_modules/,
                terserOptions: {
                    format: {
                        braces: true,
                    },
                },
            }),
            new CssMinimizerPlugin(),
        ],
    },
};

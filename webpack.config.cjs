// IMPORTS:
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        // 'webpack-hot-middleware/client/index.js?path=/__webpack_hmr&timeout=20000&reload=true',
        './src/index.js',
        './src/css/index.css',
    ],

    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'js/main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-transform-runtime',
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
                test: /\.(html)$/i,
                use: 'html-loader',
            },
        ],
    },

    resolve: {
        extensions: ['*', '.cjs', '.js', '.jsx', '.scss', '.css', '.html'],
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin({
            verbose: true,
        }),
        new HtmlWebpack({
            template: './index.html',
            filename: 'index.html',
            inject: 'body',
            scriptLoading: 'defer',
        }),
        new MiniCssExtract({
            filename: 'css/index.css',
            ignoreOrder: true,
        }),
    ],

    devServer: {
        hot: true,
        liveReload: true,

        port: 9000,
        historyApiFallback: true,
    },

    devtool: 'source-map',
};

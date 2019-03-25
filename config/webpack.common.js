// webpack.config.js
const {
    resolve
} = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动注入html
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清除多余文件
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    context: resolve(__dirname, '../'),
    entry: {
        'whatwg-fetch': 'whatwg-fetch', //fetch polyfill
        'app': './src/index.js'
    },
    output: {
        path: resolve(__dirname, '../dist'),
        filename: "scripts/[name].[chunkhash].js",
        crossOriginLoading: 'anonymous',
        publicPath: '/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 它会应用到普通的 `.js` 文件
            // 以及 `.vue` 文件中的 `<script>` 块
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.(css|less)$/,
                use: [
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {},
                }],
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件来施展魔法
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Progressive Web Application'
        }),
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.ProvidePlugin({
            join: ['lodash', 'join']
        }),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助 ServiceWorkers 快速启用
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};
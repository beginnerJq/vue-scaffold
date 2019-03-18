// webpack.config.js
const {
    resolve
} = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动注入html
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清除多余文件
const webpack = require('webpack');

module.exports = {
    //mode: "development",
    //mode:"production",
    entry: {
        app: resolve(__dirname, 'src/main.js')
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: "scripts/[name].bundle.js",
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    devServer: {
        contentBase: './dist',
        hot: true
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
                test: /\.css$|\.postcss$|\.less$/,
                use: [{
                        loader: 'vue-style-loader',
                    },
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            noIeCompat: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
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
            }, {
                sideEffects: false //表示所有文件无副作用，可以tree-shaking
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件来施展魔法
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    return merge({
        module: {
            rules: [{
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader
                ]
            }]
        },
        plugins: [
            new UglifyJSPlugin(),
            new MiniCssExtractPlugin({
                filename: "./style/[name].css"
            })
        ]
    }, common);
}
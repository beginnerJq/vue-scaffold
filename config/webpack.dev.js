 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 module.exports = (env, argv) => {
     return merge({
         devtool: 'cheap-module-eval-source-map',
         module: {
             rules: [{
                 test: /\.(css|less)$/,
                 use: [
                     'vue-style-loader',
                     'style-loader'
                 ]
             }]
         },
         devServer: {
             contentBase: './dist'
         }
     }, common);
 }
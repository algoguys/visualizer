const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
     entry: './client/app.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'app.bundle.js',
     },
     module: {
         loaders: [{
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                presets: ['es2015','react','stage-0'],
                plugins: ['react-html-attrs', 'transform-class-properties','transform-decorators-legacy']
             }
         }]
     },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve('./index.html'),
        }),
    ]
 }

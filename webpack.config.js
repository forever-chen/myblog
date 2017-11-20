const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const plugs = require('./plugsConfig');
const entry = require('./entry');
const path = require('path');
module.exports = {
    entry: entry(),
    output: {
        path: path.resolve('./public/js'),
        filename: "[name]-[hash].js"
    },
    module: {
        loaders: [
            {test: /\.css$/,loader:'style-loader!css-loader'},
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
            {test: /\.svg/, loader: 'svg-url-loader'},
            {test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,loader: 'file-loader?name=./fonts/[name].[ext]'},
        ]
    },
    plugins: [
        // new webpack.BannerPlugin('版权所有，翻版必究'),
        // new webpack.HotModuleReplacementPlugin(),//热加载插件
        ...plugs('view')
    ],
};
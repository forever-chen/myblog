const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const list = ['copy', 'crossOrigin', 'css3', 'divide', 'es6', 'h5', 'index', 'interview', 'performance', 'reactKownledge']

function plugs(director) {
    let newHtml = [];
    let htm = ''
    list.forEach((item, index) => {
        htm = item == 'index'?'index.html': item + '-page.html';
        newHtml.push(
            new HtmlWebpackPlugin({
                template: path.resolve("./views/" + htm), //new 一个这个插件的实例，并传入相关的参数
                filename: '../' + director+'/' + htm, //指定生成html文件的文件名以及文件位置,文件的位置是相对于output的path
                minify: {
                    removeAttributeQuotes: true // 移除属性的引号
                },
                chunks: ['index'], //引用多个js文件时用到这个参数
            })
        )
    })
    console.log(newHtml)
    return newHtml;
}
module.exports = plugs;
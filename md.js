const fs = require('fs');
const path = require('path');
const marked = require('marked');
const markdownv = require("markdown").markdown;
let fileContent;
fs.readdir('./md', (err, files) => {
    if (err) {
        console.log('地址有误');
    } else {
        console.log(files);
        files.length > 0 && files.forEach((item, index) => {
            translate(item.split('.')[0])
        })
    }
})

function translate(filename) {
    fileContent = fs.readFileSync(path.resolve(__dirname, 'md/' + filename + '.md'), 'utf8');
    console.log(fileContent)
    // 使用 MarkdownJS 模块把源文件转换为 HTML 源代码
    // fileContent = markdownv.toHTML(fileContent);
    fileContent = marked(fileContent, {
        breaks: true
    });
    // 保存
    const start = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta http-equiv='X-UA-Compatible' content='ie=edge'><title>Document</title></head><link rel='stylesheet' href='../css/md.css'><link rel='stylesheet' href='../css/style.css'><body><div class='toplength'><div class='top'><a href='../index.html' class='topleft'>陈耀辉</a><a href='about.html' class='topright'>About</a></div></div><div class='contentbox'><div class='content'><div class='contentInner'>";
    const end="</div></div><div class=footer>@2016-2017</div></html>";
    const address = filename === 'about' ? ('./views/' + filename + '.html') : ('./views/' + filename + '-page.html');
    fs.writeFileSync(address, start + fileContent + end);
}
// 读入 Markdown 源文件
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const markdownv= require("markdown").markdown;
let fileContent;
fs.readdir('./md',(err,files)=>{
    if(err){
        console.log('地址有误');
    }else{
        console.log(files);
        files.length>0&&files.forEach((item,index)=>{
            translate(item.split('.')[0])
        })
    }
})
function translate(filename){
    fileContent = fs.readFileSync(path.resolve(__dirname,'md/'+filename+'.md'), 'utf8');
    console.log(fileContent)
    // 使用 MarkdownJS 模块把源文件转换为 HTML 源代码
    // fileContent = markdownv.toHTML(fileContent);
    fileContent = marked(fileContent);
    
    // 保存
    const start="<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta http-equiv='X-UA-Compatible' content='ie=edge'><title>Document</title></head><link rel='stylesheet' href='style.css'><link rel='stylesheet' href='md.css'><body><div class='toplength'><div class='top'><a href='/index' class='topleft'>陈耀辉</a><a href='/about' class='topright'>About</a></div></div><div class='contentbox'><div class='content'>";
    const end="<div class='pagination'><a href='' class='pre'>&ltPre</a><a href='' class='next'>Next&gt</a></div></div></div><div class='footer'>@2012-2017</div></body></html>";
    fs.writeFileSync('./views/'+filename+'.html', start+fileContent+end);
}
// 读入 Markdown 源文件

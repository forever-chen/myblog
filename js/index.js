// 列表中数据
var list =[
    {title:'sass的基本用法',date:'Dec 1',address:'./views/sass-page.html'},    
    {title:'开发过程遇到的坑',date:'Nov 25',address:'./views/hole-page.html'},
    {title:'markdown的常用语法',date:'Nov 20',address:'./views/markdown-page.html'},
    {title:'H5新属性以及新特性',date:'Nov 11',address:'./views/h5-page.html'},
    {title:'css新属性',date:'Nov 10',address:'./views/css3-page.html'},
    {title:'前端面试',date:'Nov 9',address:'./views/interview-page.html'},
    {title:'react的Diff算法知识',date:'Nov 8',address:'./views/reactKownledge-page.html'},
    {title:'js实现深拷贝、浅拷贝',date:'Nov 7',address:'./views/copy-page.html'},
    {title:'es6的新语法',date:'Nov 6',address:'./views/es6-page.html'},
    {title:'前端网站性能优化',date:'Nov 5',address:'./views/performance-page.html'},
    {title:'前后端分离',date:'Nov 4',address:'./views/divide-page.html'},
    {title:'跨域的解决方案',date:'Nov 3',address:'./views/cross-page.html'},
    {title:'webapp与nativeapp之间的区别',date:'Nov 2',address:'./views/app-page.html'},
    {title:'函数闭包理解',date:'Oct 29',address:'./views/closed-page.html'},
    {title:'移动端字体使用',date:'Oct 20',address:'./views/mobileFont-page.html'},
    {title:'node.Js实现数据库链接',date:'Oct 18',address:'./views/mysqlConnect-page.html'},
    {title:'react基础知识',date:'Oct 16',address:'./views/react-page.html'},
    
];
// 页面渲染函数
function render(){
    list.map((item,index)=>{
        $(`<div class=title>
        <div class=titletime>${item.date}</div>
        <a href=${item.address} class='titlecontent'>${item.title}</a>
      </div>`).appendTo($('.contentInner'))
    })
}
// 页面初始化调用渲染函数
render();
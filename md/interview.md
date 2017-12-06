# 面试问题以及面试技巧
### 面试问题
* 固定高度，三栏布局，左边一个div，右边一个，中间自适应
    > 通过浮动实现(脱离文档流，兼容性比较好)
    > 通过定位实现(子元素也脱硫文档流，快捷，方便)
    > flex布局(解决上面两个的缺点，只支持到ie9)
    > table布局(兼容性好，当三个钟一个高度增加时，其它的两个也增加)
    > 网格布局(grid)
    >> 延伸：每个解决方案的优缺点、高度去掉那个还试用、兼容性怎么样
    >> 去掉高度flex和table布局是可以用的
    >> 创建bfc
    **页面布局小结：语义化掌握、页面布局深刻理解、css基础知识、思维灵活积极上进、代码书写规范**
### 面试内容
* css3盒模型
    > margin padding content border ie模型 标准模型
    > 标准模型与ie模型的区别：宽度与高度的不同，css如何设置这两种模型(标准模型指的是content的宽、高，ie的宽高包括padding、border，可以通过box-sizing)
    > js获取盒模型的宽度和高度()
    >> dom.style.width,只能取到内联样式的宽、高
    >> dom.currentStyle.width只有ie浏览器适用
    >> window.getComputedStyle.width兼容谷歌和firefox
    >> dom.getBoudingClientRect()拿到有width,height,left,top
    > 边距重叠
    > BFC(边距重叠解决方案：快捷格式上下文) IFC(内联格式上下文)
    >> display/float/over-flow/position这些属性可以创建BFC
    >> BFC垂直方向的边距会发生重叠，浮动的margin重叠，BFC是单独的元素，计算高度BFC也会计算在内
    >> 消除BFC：给子元素添加一个父元素创建一个BFC设置属性:over-flow:hidden
* DOM事件
    > DOM事件的级别
    >> DOM0 Element.onclick=function(){} //DOM1中没有涉及到与事件相关的操作
    >> DOM2 Element.addEventListenner('click',function(){},false)
    >> DOM3 Element.addEventListenner('keyup',function(){},false) //添加了许多事件
    > 了解DOM事件模型(冒泡、捕获)
    > DOM事件流(事件的捕获，到达目标元素，上升的window对象，渲染到页面)
    >> window->document->html(document.documentElenment)->body(document.body)->……->目标元素
    > EVENT对象的常见应用  
    >> e.preventDefault()
    >> e.stoppropagation()
    >> e.stopImmidiatePropagation()
    >> event.currentTarget
    >> event.target
    > 自定义事件

        var eve = new Event('custom');
        ev.addEventListener('custom',function(){});
        ev.dispatchEvent(eve);//触发事件
* http协议
    > http协议的主要特点
    >> 简单快速(统一UIA)、灵活(可以实现不同数据类型的传输)、无连接(连接一次就会断开)、无状态(不能区分两次连接的客户)
    > http报文的组成部分
    >> 请求报文：请求行(请求类型)、请求头（key：value）、空行(分割请求头和请求体)、请求体
    >> 相应报文：状态行、响应头（key：value）、空行、响应体
    > http方法：get、post、delete、put、head
    > get与post的区别
    >> 在浏览器中回退时，get请求不会再次请求，而post请求会再次发起请求
    >> get请求可以被收藏，浏览器可以主动缓冲，参数也会被保存到浏览器地址栏中，但是post请求不行
    >> get请求传参有长度限制（2kb）过长会被截断，post没有限制
    >> get比post更不安全
    >> get参数放在url中，post放在request.body中
    > 1指示信息；2链接成功；3重定向；4客户端错误；5服务端错误
    >> 301永久重定向，302临时重定向，304表示客户端有缓冲，原来的缓冲还可以用，不需用从服务器重新获取
    >> 400客户端有语法错误，一般是传参有问题；403对请求页面的访问被禁止
    >> 503服务端宕机或者是临时过载，过段时间就好了
    > http协议正常是请求-应答模式，请求时链接，正常返回之后结束，但是采用keep-alive模式之后，链接持久有效（1.1版本支持，0版本不支持）
    > 管线化：将所有请求一次打包然后发起请求，服务端一次把所有请求结果都返回，不是正常的请求一次返回一次；只有get和head请求可以管线化，初次链接不要启动管线化，因为对方的服务器可能不支持管线化；管线化对浏览器的支持不太好
* 原型链
    >创建对象的方式三种
    
        //第一种方式：字面量的方式
        var obj={name:1}
        var obj=new Object({name:1})
        //第二种方式：构造函数的方式
        var fun = function(name){this.name=name};
        obj=new fun();
        //第三种方式：create的方式
        var obj = Object.create({name:1})
    > 原型链的基本原理就是实例化的对象拥有它的构造函数的属性以及构造函数原型的所有方法
    > \_\_proto\_\_属性是构造函数的原型的属性
    > 
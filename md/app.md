# webapp与nativeapp之间的区别
### Native App开发
* Native App开发即我们所称的传统的APP开发模式（原生APP开发模式），该开发针对ISO、Android等不同的手机操作系统要采用不同的语言和框架进行开发，该模式通常是由“云服务器数据+APP应用客户端”两部分构成，App应用所有的UI元素、数据内容、逻辑框架安装在手机终端上。
#### Native APP应用成呈现特点
* 每次获取最新的APP功能，需要升级APP应用
* 原生性APP的应用安装包相对比较大，包含UI元素、数据内容、逻辑框架，手机无法上完也可以访问app
* 原生APP可以调用手机终端的硬件设备（语音、摄像头、短信、GPS等功能）
* 适用于游戏、电子杂志、、管理应用、物联网等无需经常更新的程序框架的APP应用
### Web App开发
* Web App开发即使一种框架型APP开发模式，该开发具有跨平台的优势，该模式通常由“HTML5云网站+APP应用客户端”两部分构成，APP应用客户端只需安装应用的框架部分，而应用的数据则是每次打开APP的时候去云端获取数据呈现给手机用户
#### webapp的应用呈现的特点
* 每次打开APP都要去云端获取页面结构以及数据，如果手机没有网络则获取不到页面UI
* 框架型APP无法调用手机终端的硬件设备（语音、摄像头、短信、GPS、重力感应等），每次打开APP上网的速度是偶到手机终端上网的限制
* 框架型APP应用的安装包小巧，只包含框架文件，而大量的UI元素、数据内容存放在云端，用户每次访问拿到的都是最新的数据，用户不需用频繁更新APP
* webapp适用于电子商务、金融、新闻资讯、企业集团需经常跟新内容的APP
##
### webapp开发技巧总结
* 百度禁止转码

		<meta http-equiv="Cache-Control" content="no-siteapp" />

* 设置状态栏的背景颜色（IOS）

		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
		default ：状态栏背景是白色。
		black ：状态栏背景是黑色。
		black-translucent ：状态栏背景是半透明。 如果设置为 default 或 black ,网页内容从状态栏底部开始。 如果设置为 black-translucent ,网页内容充满整个屏幕，顶部会被状态栏遮挡。
* 移动端手机号码识别（IOS）

		7位数字，形如：1234567
		带括号及加号的数字，形如：(+86)123456789
		双连接线的数字，形如：00-00-00111
		11位数字，形如：13800138000
		可能还有其他类型的数字也会被识别。我们可以通过如下的meta来关闭电话号码的自动识别：
		<meta name="format-detection" content="telephone=no" />
### webapp开发中遇到的坑
* css3动画在Ios运行正常，在Android无法运行。因‘-webkit-’前缀未正确书写导致：-webkit-前缀没有写规范。以下是完整的css3动画代码（无限360°旋转）。'animation','@keyframes','transform' 需要在这三个地方都加上‘-webkit-’前缀，所以请检查下是否正确书写了前缀。

		 1 img {
		 2     animation: payLoad .5s linear infinite;
		 3     -webkit-animation: payLoad .5s linear infinite
		 4 }
		 5 @keyframes payLoad {
		 6     from {
		 7         transform: rotate(0deg)
		 8     }
		 9     to {
		10         transform: rotate(360deg)
		11     }
		12 }
		13 @-webkit-keyframes payLoad {
		14     from {
		15         -webkit-transform: rotate(0deg)
		16     }
		17     to {
		18         -webkit-transform: rotate(360deg)
		19     }
		20 }
* 含有es6语法的js文件在手机上无法兼容浏览器
* 使用 CSS3 动画的时尽量利用3D加速，从而使得动画变得流畅。动画过程中的动画闪白可以通过 backface-visibility 隐藏。

		-webkit-transform-style: preserve-3d;
		-webkit-backface-visibility: hidden;
* 比如要绑定一个 touchmove 的事件，正常的情况下类似这样(来自呼吸二氧化碳)，而如果中间的 code 需要处理的东西多的话，[FPS](https://baike.baidu.com/item/FPS/3227416?fr=aladdin) 就会下降影响程序顺滑度，而如果改成这样

		$('div').on('touchmove', function(){
		   //.….code
		});
		$('div').on('touchmove', function(){
		   setTimeout(function(){
		     //.….code
		   },0);
		});
		把代码放在 setTimeout 中，会发现程序变快.
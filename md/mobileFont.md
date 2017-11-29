# 移动端字体使用
---
### 基于rem实现移动端字体大小的设置
* 页面元素的布局尺寸全都以设计稿为基准等比例设置。
* 给html根节点设置一个基础font-size值，然后页面的所有元素布局均相对于该font-size值采用rem单位设定。

		例：
		我们的设计稿尺寸都是640px的，iphone5的deviceWidth是320px，那么
		计算出来的font-size值就是 320 / 640 = 0.5，因为得出的font-size
		太小，不方便计算，且有的浏览器可能不兼容太小字号，所以将font-size
		放大100倍，所以最终计算出来的font-size为320/640*100 =50(px); 
		deviceWidth = 320，font-size = 320 / 6.4 = 50px
		deviceWidth = 375，font-size = 375 / 6.4 = 58.59375px
		deviceWidth = 414，font-size = 414 / 6.4 = 64.6875px
		deviceWidth = 500，font-size = 500 / 6.4 = 78.125px
* 既然这样我们就可以在script标签内直接

		(function () {
		document.addEventListener('DOMContentLoaded', function () {
		    var html = document.documentElement;
		    var windowWidth = html.clientWidth;
		    html.style.fontSize = windowWidth / 6.4 + 'px';
		    // 等价于html.style.fontSize = windowWidth / 640 * 100 + 'px';
		}, false);
		})();
		// 这个6.4就是根据设计稿的横向宽度来确定的，假如你的设计稿是750
##
* 如果网页没有用到特殊的点阵字体，字体单位使用rem，如果用到了点阵字体，字体需要通过媒体查询设置几种固定大小的字体(点阵字体是位图字体，通常的字体是矢量字体)

		@media screen and (max-width: 320px) {
			body{font-size: 14px;}
		}
		@media screen and (min-width: 321px) and (max-	width: 413px) {
			body{font-size: 16px;}
		}
			@media screen and (min-width: 414px) and (max-width: 639px) {
			body{font-size: 17px;}
		}
		@media screen and (min-width: 640px) {
			body{font-size: 18px;}
		}
* 如果通过rem设置背景图的话，对于用图片精灵技术的图片，可能会出现位置错乱，如果图片不多的话可以使用单张图片，但这样会增加http请求数，加大服务器压力
* 浏览器在处理小数像素的时候不是进行的四舍五入，而是把舍去的小数或者是入了小数部分给到了下一个色块来处理，以此类推，但是元素依旧占用着空间，解决这种问题方法如下：
* 第一种方式：使用iconfont
* 第二种方式：如需使用backround-image，尽量为背景图设置一定的空隙
* 扩展链接：[WebApp与Native App有何区别呢？](https://www.cnblogs.com/webapplee/p/3771716.html)
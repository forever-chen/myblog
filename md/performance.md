# 网站性能优化
---
#### 将小图标制作成iconfont
* 能减少文件体积、降低服务器请求数，节约宽带资源，有利于后期维护。
* 浏览器只兼容到ie9以上
* 用矢量制作工具制作保存成为svg：Adobe Illustrator
* iconfont生成器：[icomoon.io](https://icomoon.io/)或者[fontello](http://fontello.com/) + 自制CSS文件
* 相关链接[iconfont制作](http://www.uisdc.com/4-icon-font-production-method)
* [inconfont的使用以及见个人库](https://www.cnblogs.com/camille666/p/iconfont.html)
* 使用ajax缓冲（对于数据不变的页面可以使用）
* 组件开发，提升公用组件，组件的按需加载
* 将js文件放置于html文件底部，或者在顶部时使用async异步加载
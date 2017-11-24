# 函数闭包理解
---
### 闭包的概念
* 闭包的来源：函数外部无法访问函数内部的变量，这是由于函数的作用域链导致的，在函数内部访问变量时程序会一层一层往上找变量，但是反之则不行
* 
		 function f1(){
		　　　　var n=999;
		　　　　function f2(){
		　　　　　　alert(n); 
		　　　　}
		　　　　return f2;
		　　}
		　　var result=f1();
		　　result(); // 999
		只有通过这样的方式才能访问到函数内部的变量
### 闭包的用途
* 在函数外部可以读取到函数内部的变量
* 让这个变量的值始终保存在内存中
* 
		function f1(){
		　　　　var n=999;
		　　　　nAdd=function(){n+=1}
		　　　　function f2(){
		　　　　　　alert(n);
		　　　　}
		　　　　return f2;
		　　}
		　　var result=f1();
		　　result(); // 999
		　　nAdd();
		　　result(); // 1000
		n变量在f1执行完毕之后没有被自动清，因为n相对于f2函数来说是一个全局变量
### 闭包的注意事项
* 因为闭包会把一些看似局部变量的全局变量保存在内存中，所以会浪费内存，不能滥用，会造成内存泄漏
### 示例代码
+ 示例一

		var name = "The Window";
		　　var object = {
		　　　　name : "My Object",
		　　　　getNameFunc : function(){
		　　　　　　return function(){
		　　　　　　　　return this.name;
		　　　　　　};
		　　　　}
		　　};
		alert(object.getNameFunc()());
+ 示例二

		var name = "The Window";
		　　var object = {
		　　　　name : "My Object",
		　　　　getNameFunc : function(){
		　　　　　　var that = this;
		　　　　　　return function(){
		　　　　　　　　return that.name;
		　　　　　　};
		　　　　}
		　　};
		　　alert(object.getNameFunc()());
**相关链接：[闭包理解](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)**
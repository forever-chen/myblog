# 工作中遇到的坑
---
### react中的坑
* 对于数组遍历使用map方法时，如果每次遍历的key设置成index则列表中原生的组件或者是标签会正常渲染，但是遇到自定义的组件就不会渲染
* setState()是异步的，这样会调用render方法，但是并不会立即改变state的值
* reducer必须返回一个新的对象才能出发组件的更新
因为在connect函数中会对新旧两个state进行浅对比，如果state只是值改变但是引用地址没有改变，connect会认为它们相同而不触发更新。
* 组件命名的首字母必须是大写，这是类命名的规范。
* react事件处理不能通过`return false`来阻止默认事件，必须用`event.preventDefault()`。
* componentWillUpdate中可以直接改变state的值，而不能用setState。
* react的时间绑定有三种方式:事件绑定都是通过事件代理的方式绑定到document上，达到性能优化的木的。

		this.handleClick = this.handleClick.bind(this); // 这种是官方给出的方式
		onClick={(e) => this.handleClick(e)} // 这样的用法就是不让handleClick函数脱离类的实例对象，反而将DOM元素作为参数传到函数中。
		handleClick = () => {
				console.log('this is:', this); // 此语法只建立在Babel中，不属于ES6语法内容
		}
* 组件卸载之前，加在dom元素上的监听事件，和定时器需要手动清除，因为这些并不在react的控制范围内，必须手动清除。指的是在this.refs.xxx这种真实dom上addEventListener这样添加的监听事件，在组件卸载的时候要手动清除(removeEventListener)，react组件上的onClick这种不用管，react帮我们处理好了
* react首屏渲染速度比较慢，是因为它首先要在内存中构建页面框架，然后才会在浏览器中进行渲染，但是在第一次渲染完成之后，后期进行变化时由于react的diff算法，渲染速度比较快
* 首先是在页面中，当元素加载之前和加载之后，绑定滚动事件。

		constructor(props) {
		    super(props);
		    this.state = {
		      sidebarFixed: false,
		    };
		  }
		componentWillMount() {
		    window.addEventListener('scroll', this.handleScroll.bind(this));
		  }
		  componentDidMount() {
		    window.addEventListener('scroll', this.handleScroll.bind(this));
		  }
		handleScroll() {
		    const scrollTop = document.body.scrollTop;
		    const headerHeight = document.getElementById('header').offsetHeight;
		    if (scrollTop >= headerHeight) {
		      this.setState({ sidebarFixed: true });
		    } else {
		      this.setState({ sidebarFixed: false });
		    }
		  }
* 这里会出现一个问题，就是当页面跳转时，该事件没有被解除，在其他页面进行页面滚动时，会报错。因为获取不到页面元素header的高度，所以当离开该页面的时候，需要解除绑定事件。

		componentWillUnmount() {
			window.removeEventListener('scroll', this.handleScroll.bind(this));
		}
### jquery中的坑
---
##### jquery的核心
* 从设计层面来看，我们可以将jQuery提供方法分为两大类：静态方法和实例方法。
	>1、静态方法就是直接通过$访问的方法，这些方法一般不对dom元素操作，而是提供了一些常用的工具，比如ajax请求、以及对字符串的一些常用操作   
	>2、jQuery还提供了对自身的扩展机制，你可以通过extend方法来编写你需要的组件。
* 而实例方法和静态方法不一样，它是用来对jQuery查询的DOM元素进行操作，jQuery 执行$()会构建一个 jQuery 对象，这个对象以数组的方法存储查询出的所有DOM元素，然后在这个对象的原型链上实现了对这些 DOM 操作的方法，比如 each()方法就是用来遍历每一个DOM元素的。
* jquery==$
* jquery代码执行过程如下：
* 
		jQuery = function( selector, context ) { 
		    return new jQuery.fn.init( selector, context );
		}
		------------------------------------------
		init = jQuery.fn.init = function( selector, context, root ) {
		   return this;
		}
		init.prototype = jQuery.fn;
		--------------------------------------------
		jQuery.fn = jQuery.prototype = {
		    // The current version of jQuery being used
		    jquery: version,
		    constructor: jQuery,
		    // The default length of a jQuery object is 0
		    length: 0,
		    // Execute a callback for every element in the matched set.
		    each: function( callback ) {
		        return jQuery.each( this, callback );
		    },  
		    splice: arr.splice
		};
* 上面的整个过程可以表述为：jQuery首先定义了一个init方法，然后在 init 的原型对象 prototype上定义了一系列操作方法。最后将init方法的实例对象返回
* **那么问题来了，jQuery.fn 中的方法为什么不直接定义在 init 的prototype上，而要定义在 jQuery 的原型对象上？**

* 其实，这样做的目的是为了提高 jQuery 的查询效率，如果直接定义在 init 的 prototype 对象上，那么每执行一次查询，就会在内存中创建这样一个庞大的prototype对象，而如果把这个对象定义在jQuery的prototype上，在jQuery加载时，这个对象就会被初始化并一直存在于内存中，以后每次执行 $() 时，只需要将init中的prototype指向这个对象就可以了，而不用每次都去创建一遍相同的对象。
* new方法的核心是：1、创建一个空对象；2、将空对象的原型指向原来的对象的prototype；3、调用call方法将this指向新对象；4、最后返回该对象
* jquery中的闭包

		(function($){
		     $("div p").click(function(){alert("cssrain!")});
		})(jQuery);            //一个闭包
		在这个函数中，$是形参，jquery是实参
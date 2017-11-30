# call、apply、bind的区别
### call的用法

        function a(){
            console.log(this); //输出函数a中的this对象
        }
        function b(){} //定义函数b
        
        var obj = {name:'onepixel'}; //定义对象obj
        
        a.call(); //window
        a.call(null); //window
        a.call(undefined);//window
        a.call(1); //Number
        a.call(''); //String
        a.call(true); //Boolean
        a.call(b);// function b(){}
        a.call(obj); //Object，相当于函数a中的this指向了obj
### apply的用法
* apply 和 call 的唯一区别是第二个参数的传递方式不同，apply 的第二个参数必须是一个数组，而 call 允许传递一个参数列表。

        function b(x,y,z){
            console.log(x,y,z);
        }
        
        b.apply(null,[1,2,3]); // 1 2 3
### bind的用法
* ES5引入 bind 的真正目的是为了弥补 call/apply 的不足，由于 call/apply 会对目标函数自动执行，从而导致它无法在事件绑定函数中使用，因为事件绑定函数不需要我们手动执行，它是在事件被触发时由JS 内部自动执行的。而 bind 在实现改变函数 this 的同时又不会自动执行目标函数，因此可以完美的解决上述问题
* 
        var obj = {name:'onepixel'};
        
        /**
        * 给document添加click事件监听，并绑定onClick函数
        * 通过bind方法设置onClick的this为obj，并传递参数p1,p2
        */
        document.addEventListener('click',onClick.bind(obj,'p1','p2'),false);
        
        //当点击网页时触发并执行
        function onClick(a,b){
            console.log(
                    this.name, //onepixel
                    a, //p1
                    b  //p2
            )
        }
* 一旦函数通过bind传递了有效的this对象，则该函数在运行期的this将指向这个对象，即使通过call或apply来试图改变this的指向也是徒劳的。
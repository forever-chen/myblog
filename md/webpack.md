# webpack的用法
### webpack的命令行操作
* 模块解析

        webpack hello.js hello.bundle.js --module-bind 'css=style-loader!css-loader'
* 自动监控

        webpack hello.js hello.bundle.js --module-bind 'css=style-loader!css-loader' --watch
* 列举打包模块

    webpack hello.js hello.bundle.js --module-bind 'css=style-loader!css-loader' --progress --display-modules
* 列举打包原因

        webpack hello.js hello.bundle.js --module-bind 'css=style-loader!css-loader' --progress --display-modules --display-reasons
* 改变webpack.config.js的文件名

        webpack --config webpack.dev.config.js
### webpack 配置文件内容
* 输入、输出接口
        entry:{     // 这个地方可是数组、字符串、对象
            index1:'./src/container/index1.js' // 这块可以是字符串、数组（打包之后的这个文件包含数组的每一个js文件）
        },
        output:{
            path: path.resolve(__dirname, "public/assets"),   // 打包之后的文件输出地址，这块必须是绝对地址
            filename:'[name]-[hash].js',    // 打包之后的文件名，可以加上hash值和chunkhash值
           publicPath: "https://cdn.example.com/assets/" // output.path 中的 URL 以 HTML 页面为基准。
        },
* 插件的使用

        new htmlWebpackPlugin({
            template:'./template/index.html'    // 默认打包之后的地址为output指定的path中
            filename:'index-[hash].html'    // 这里可以指定模板生成的文件的名字以及文件地址，这个地址是相对于output的path地址而言
            inject:'head'   // z这里可以指定自动生成script标签嵌入到文档的位置,值为true或者是body则会添加到页面的底部;设置为false(必须是布尔类型的，不能是字符串的false)则不会注入任何js文件
            chunks:[]   // 这里可以添加要给页面中添加的js文件，如果用chunks在页面中获取的chunks就是这个数组里面的数组而不是，entry里面的所有数据
        })

        <script src="<%= htmlWebpackPlugin.files.chunks.index1.entry %>"></script>  //直接这样写可以在页面中插入指定的js文件
        <%= compilation.assets[htmlWebpackPlugin.files.chunks.index1.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>
        在模板文件中这样设置可以引入一些公用的js文件，这些文件没有必要放在服务端，增加页面的http请求个数，增加页面的压力，直接添加在页面中，减少http请求
* loader的使用

        loader: "style-loader!css-loader", // !对两个loader进行串联，经过css处理过的文件，style-loader会给页面中添加一堆style标签
        postcss使用会报错：ERROR in ./node_modules/css-loader?module=true!./node_modules/postcss-loader/lib!
        解决办法：直接在根目录下新建postcss.config.js文件然后把相关配置放入其中就可以了
        [css-loader相关链接](https://www.npmjs.com/package/css-loader)
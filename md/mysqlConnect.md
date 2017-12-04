# node.Js实现数据库链接
---
### Node.js使用MySQL的连接池
* 首先安装mysql   

		var mysql =  require('mysql');
		var mysql =  require('mysql');
* 然后与数据库进行链接

		const pool=mysql.createPool({  
		 connectionLimit:10000,   
			host:'localhost',   
			user:'root',   
			password:'',   
			database:'kangnier'    
		})
* 对pool方法进行封装

		function query(sql,arr,fn){
			pool.getConnection((err,con)=>{
				con.query(sql,arr,(err,res)=>{{
					con.release()//连接数据库获取到数据之后释放连接，避免一直占着浪费空间
					fn(err,res);
				}})
			})
		}
		module.exports=query //最后暴露出去

* 可以同时执行多条语句，但是要在连接时候进行设置

		var connection =  mysql.createConnection( { multipleStatements: true } );		
		connection.query('select column1; select column2; select column3;', function(err, result){
		  if(err){
		  	throw err;
		  }else{
		  	console.log(result[0]);       // Column1 as a result
		  	console.log(result[1]);       // Column2 as a result
		  	console.log(result[2]);       // Column3 as a result
		  }
		});

---
### SQL中防止sql注入
##### escape的编码规则
* Numbers不进行转换；
* Booleans转换为true/false；
* Date对象转换为’YYYY-mm-dd HH:ii:ss’字符串；
* Buffers转换为hex字符串，如X’0fa5’；
* Strings进行安全转义；
* Arrays转换为列表，如[‘a’, ‘b’]会转换为’a’, ‘b’；
* 多维数组转换为组列表，如[[‘a’, ‘b’], [‘c’, ‘d’]]会转换为’a’, (‘b’), (‘c’, ‘d’)；
* Objects会转换为key=value键值对的形式。嵌套的对象转换为字符串；
* undefined/null会转换为NULL；
* MySQL不支持NaN/Infinity，并且会触发MySQL错误。

##### 第一种方式：使用escape对传入参数进行编码   
* 
		var userId = 1, name = 'test';
		var query = connection.query('SELECT * FROM users WHERE id = ' + connection.escape(userId) + ', name = ' + connection.escape(name), function(err, results) {
		    // ...
		});
		console.log(query.sql); // SELECT * FROM users WHERE id = 1, name = 'test'

##### 第二种方式：使用connection.query()的查询参数占位符   
*   
		var userId = 1, name = 'test';
		var query = connection.query('SELECT * FROM users WHERE id = ?, name = ?', [userId, name], function(err, results) {
		    // ...
		});
		console.log(query.sql); // SELECT * FROM users WHERE id = 1, name = 'test'
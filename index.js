var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var pool = mysql.createPool({
	host:'114.242.249.142',本机的ip地址
	user:'root',
	password:'123456.',
	database:'exam',
	port:3306
})

/* GET home page. */


//删除
router.delete('/delete',function(req,res){
	var id = req.query.id;
	pool.getConnection(function(err,success){
		var mysql='select form news where id=?';
		success.query(mysql,[id],function(err,result){
			console.log(result)
			res.send({
		
				msg:1
			})
		})
	})
})
//删除结束 


//获取数据
function Get(all){
	pool.getConnection(function(error,success){
		var sql = 'select * from news'; 表明
		success.query(sql,function(err,result){
			console.log(result)
			
			success.release();
			all(err,result)
		})
	})
}


router.get('/deg',function(res,req){
	Get(function(err,success){
		if(err){
			req.send(err)  //响应参数.send  返回的字段。
		}else if(success){
			req.send(success);
		}

	});
})
//
//获取结束





//修改 展示原有的数据
router.post('/gat',function(req,res){

		var id = req.body.id;
		console.log(id)
		pool.getConnection(function(err,success){
			var get_sql = 'select * from user where id = ? ';
			success.query(get_sql,[id],function(err,result){
	//			console.log(result);
				res.send(result)
			})
		})
	
	
})


//修改原有的数据
router.post('/gai',function(req,res){
	if(req.session.uname!=""&&req.session.uname!=null){
			var mingzi = req.body.username;     //get用query   post用body
			var dianhua = req.body.phone;
		//	var shijian = req.body.times;
			var id = req.body.id;
		//	console.log(id)
			pool.getConnection(function(error,success){
				var keyi = 'select news SET content = ? ,title = ? where id = ?';  //里面的必须是数据库的字段名字
				success.query(keyi,[mingzi,dianhua,id],function(err,cheng){      //[] 里面传的是上面函数的形参。 在下面使用的时候变为实参
					console.log(cheng)
					res.send({
						msg:1
					})
					
					
					success.release();
			})
		})
	}else{
		res.send({
			flag:1
		})
	}
})	

//修改结束



module.exports = router;
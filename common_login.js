//全局ID，修改，查看
var updateId, lookId;

// 注意：上传，包括查看的时候这个地址不要再页面里边放。。。
var urldata = 'http://file.gcx365.com:8090/';
/*封装的普通轮播图的js*/
function OrdinaryCarousel(Eve, time) {
	/*切换的方法*/
	function tab() {
		Eve.find('ol li').eq(iNow).addClass('active');
		Eve.find('ol li').eq(iNow).siblings('li').removeClass('active');
		Eve.find('ul li').eq(iNow).addClass('active');
		Eve.find('ul li').eq(iNow).siblings('li').removeClass('active');
	}
	/*自动轮播方法*/
	function tick() {
		timer = setInterval(function() {
			iNow++;
			if(iNow == Eve.find('ul li').length) {
				iNow = 0;
			}
			tab();

		}, time);
	}
	Eve.find('ol').on('click', 'li', function() {
		iNow = $(this).index();
		tab();
	});
	var iNow = 0;
	var timer = null;
	tick();
	Eve.hover(function() {
		clearInterval(timer);
	}, function() {
		tick();
	});
}
//取出中文汉字，并且截取相应的字数
function sub_string(str, length) {
	var str = str;
	str = str.replace(/<\/?.+?>/g,"").replace(/ /g,"");
	str = str.replace(/[^\u4e00-\u9fa5 0-9]/gi, "");
	if(str.length > length) {
		return str.substring(0, length) + "..."
	}
	return str
}




//取出字符串，并且截取相应的字数
function sub_string01(str, length) {
    var str = str;
    str = str.replace(/<\/?.+?>/g,"").replace(/ /g,"");
    str = str.replace(/[^\u4e00-\u9fa5 0-9]/gi, "");
    if(str.length > length) {
        return str.substring(0, length) + "..."
    }
    return str
}



function subAllString(str, length) {
	var str = str;
	str = str.replace(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/gi, "");
	if(str.length > length) {
		return str.substring(0, length) + "..."
	}
	return str
}

//时间戳
var format = function(time, format) {
	var t = new Date(time);
	var tf = function(i) {
		return(i < 10 ? '0' : '') + i
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch(a) {
			case 'yyyy':
				return tf(t.getFullYear());
				break;
			case 'MM':
				return tf(t.getMonth() + 1);
				break;
			case 'dd':
				return tf(t.getDate());
				break;
		};
	});
};

function timestamp(url) {
	var getTimestamp = new Date().getTime();
	if(url.indexOf("?") > -1) {
		url = url + "&_=" + getTimestamp
	} else {
		url = url + "?_=" + getTimestamp
	}
	return url;
}

function get_model(model) {
	$("#laydate_box").remove();
	if(model == "news") {
		var url = "/newsweb/newsList24.html";
		$("#container").load(url);
	} else if(model == "news_audit") {
		var url = "/newsweb/newsAudit.html";
		$("#container").load(url);
	} else if(model == "credit_park1") {
		var url = "/settledweb/credit_park.html";
		$("#container").load(url);
	} else if(model == "credit_park_audit1") {
		var url = "/settledweb/credit_park_audit.html";
		$("#container").load(url);
	} else {
		var url = timestamp(model + '.html')
		$("#container").load(url);
	}
}

function get_modelTwo(model) {
	$("#container").load(model);
}

/* 定义头部的方法 */
function get_common_head() {
	$("#common_head").load("./common_head.html");
}

/* 定义尾部的方法 */
function get_common_footer() {
	$("#common_footer").load("./common_footer2.html");
	$("#common_footer_lang").load("./common_footer.html");
}
 
$(function() {
	// 执行头部的方法
	get_common_head();
	// 执行尾部的方法
	get_common_footer();
}); 
//登录方法
 Login();
function Login() {
	$.ajax({
		url: "/usermanage/userController/isLogin.do",
		type: "post",
		dataType: "json",
		data: {},
		success: function(data) {
			if(data.data==="请登录"){
				$("#login_html").text('请登录');
			}else{
				$("#login_html").text('欢迎您，'+data.data.userName);
				
			}
		}
	});
} 


var cId=GetQueryString('cId');
//获取地址栏
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]);
    return null;
}
//退出登录
function signOut() {
	$.ajax({
		url: '/usermanage/userController/dropout.do',
		type: 'post',
		async: true,
		data: {},
		dataType: 'json',
		success: function(result) {
			console.log(data);
			if(result.status == 0) {
				window.location.href = "/bankweb/login_admin.html?cId="+cId;
			} else {
				alert(result.data);
			}
		}
	});
}
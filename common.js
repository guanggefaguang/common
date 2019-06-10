

$(function() {

    // 执行头部的方法
	get_common_head();
    // 执行尾部的方法
    get_common_footer();
    // 执行登录的方法
    get_login_bomb_box();
    detail_opra_1512358400205();
	$('title').html('"一带一路"城市指数系统');
});
//替换请选择
function changeqing_str(str) {
    str = str.replace(/\:请选择/g, "");
    return str == "请选择" ? "" : str;
}
function q_str(str) {
    str = str.replace(/\:市辖区/g, "");
    return str == "市辖区" ? "" : str;
}

//刷新当前页面
function winrload(){
    window.location.reload();
}



//本地跳转
function href_J(enter) {
	if(enter==""){

	}else{
        window.location.href='/citylightsweb/'+enter+'.html?cityCode='+cityCode;
	}

}
//新打开页面
function href_X(enter) {
   if(enter==""){
}else{
       window.open('/citylightsweb/'+enter+'.html?cityCode='+cityCode);
   }
}

function href_X_details(enter) {
   if(enter==""){
}else{
       window.open(enter);
   }
}

function href_custom_details(enter) {
    if(enter==""){
    }else{
        window.open('/icieplweb/project/procustom_detail.html?cityCode='+cityCode+'&customId='+enter);
    }
}

//进入投资环境服务网
function href_uieapweb(enter) {
    if(enter==""){
    }else{
        window.open('/uieapweb/'+enter+'.html?cityCode='+cityCode);
    }
}

//进入投资环境服务网
function href_beasweb(enter) {
    if(enter==""){
    }else{
        window.open('/beasweb/'+enter+'.html?cityCode='+cityCode);
    }
}

function newsDetail(id,category){
    window.open('invest_environment_health.html?cityCode='+cityCode+'&newsId='+id+'&category='+category,'_blank')
}
//过滤标签
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str = str.replace(/ /ig, ''); //去掉
    return str;
}

//系统暂无开发
function being() {
  layer.alert('系统正在开发中，敬请期待！')
};



//自定义serializeObject;
jQuery.prototype.serializeObject=function(){
    var a,o,h,i,e;
    a=this.serializeArray();
    o={};
    h=o.hasOwnProperty;
    for(i=0;i<a.length;i++){
        e=a[i];
        if(!h.call(o,e.name)){
            o[e.name]=e.value;
        }
    }
    return o;
};

//数组去重
Array.prototype.distinct = function (){
    var arr = this,
        i,
        obj = {},
        result = [],
        len = arr.length;
    for(i = 0; i< arr.length; i++){
        if(!obj[arr[i]]){ //如果能查找到，证明数组元素重复了
            obj[arr[i]] = 1;
            result.push(arr[i]);
        }
    }
    return result;
};

//登录弹窗
function entry_login(){
	$('#login_window').load('/citylightsweb/login_window.html');
}

//项目入库跳转
function projectentry(model,type) {
    $.ajax({
        url: "/usermanage/userController/isLogin.do",
        type: "post",
        async:false,
        dataType: "json",
        data: {},
        success: function(data) {
			if(data.data === "请登录") {
            	layer.alert('入库前请登录')
				$('.layui-layer-btn0').click(function () {
                    entry_login();
                })
			} else {
                window.open('/icieplweb/'+model+'.html?cityCode='+cityCode+'&protype='+type);
            }
        }
    });
}

//项目自定义入库跳转
function projcustom(typenum){
    $.ajax({
        url: "/usermanage/userController/isLogin.do",
        type: "post",
        async:false,
        dataType: "json",
        data: {},
        success: function(data) {

            if(data.data === "请登录") {
                layer.alert('入库前请登录')
                $('.layui-layer-btn0').click(function () {
                    entry_login();
                })
            } else {
                window.open('/icieplweb/project/procustom.html?cityCode='+cityCode+'&projectType='+typenum);
            }
        }
    });
}

//项目库详情页跳转
function prodetaentry(model,id) {

    $.ajax({
        url: "/usermanage/userController/isLogin.do",
        type: "post",
		async:false,
        dataType: "json",
        data: {},
        success: function(data) {
            if(data.data === "请登录") {
                layer.alert('查看详情，请登录')
                $('.layui-layer-btn0').click(function () {
                    entry_login();
                })
            } else {
                window.open('/icieplweb/'+model+'.html?cityCode='+cityCode+'&proid='+id,'_blank');
                isopennew=true

            }
        }
    });
}





var cityCode = GetCid(cityCode)
//GetCid('id')
//获取cityCode
function GetCid(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;

};

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function getParams(key) {
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2]);
	}
	return null;
};

var cityCode = getParams('cityCode');


//登录方法

function Login() {
	$.ajax({
		url: "/usermanage/userController/isLogin.do",
		type: "post",
		dataType: "json",
		data: {},
		success: function(data) {
			if(data.data === "请登录") {
				$('#userCenterLi').hide()
                $('#userLogin').show()
				$('#login_html').text('')
			} else {
				$("#login_html").text('欢迎您，'+data.data.userName);
                $('#userLogin').hide()
				$('#userCenterLi').show()
                addCookie('userName', data.data.userName);
                addCookie('userId', data.data.userId);
				// console.log("登陆了")
			}
		},
		error:function(){
			$('.compName').html('')
		}
	});
}


//退出登陆的方法
function signOut() {
    $.ajax({
        url: '/usermanage/userController/dropout.do',
        type: 'post',
        async: true,
        data: {},
        dataType: 'json',
        success: function (result) {
            if (result.status == 0) {
                $('#login_html').text('');
                removeCookie("userName");
                removeCookie("userId");
               // window.location.reload();
                window.location.href='/citylightsweb/index.html?cityCode='+cityCode
            } else {
                alert(result.data);
            }
        },
        error: function () {
            alert("error");
        }
    });
}


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
	if(!str)
		return ""
	var str = str;
	str = str.replace(/<\/?.+?>/g, "").replace(/ /g, "");
	//str = str.replace(/[^\u4e00-\u9fa5 0-9 a-zA-Z , ， . 。 ！ ； ; : ? ？&]/gi, "");
	if(str.length > length) {
		return str.substring(0, length) + "..."
	}
	return str
}

//关闭窗口
function custom_close() {
    if (confirm("您确定要关闭本窗口吗？")) {
        window.opener = null;
        window.open('', '_self');
        window.close();
    }
    else {
    }
}

//无数据弹窗
function nodata() {
    layer.alert('正在开发中，敬请期待！')
}

//替换请选择
function change_str(str) {
    str = str.replace(/\:请选择/g, "");
    return str == "请选择" ? "" : str;
}
//排除某个字
function change_sting(str) {
    str = str.replace("市", "");
   return str
}

// 百度地图API功能
function baiduapi() {
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);
    function myFun(result){
        var cityName = result.name;
        map.setCenter(cityName);
    $('#cityname').text(change_sting(cityName));
    }
    var myCity = new BMap.LocalCity();
    myCity.get(myFun);

}


//取出中文汉字，并且截取相应的字数
function sub_string1(str, length) {
    if(!str)
        return ""
    var str = str;
    str = str.replace(/<\/?.+?>/g, "").replace(/ /g, "");
    str = str.replace(/[^\u4e00-\u9fa5 0-9 a-zA-Z]/gi, "");
    if(str.length > length) {
        return str.substring(0, length) + ""
    }
    return str
}
//去标签
function sub_bq(str) {
	if(!str)
		return ""
	var str = str;
	str = str.replace(/<\/?.+?>/g, "").replace(/ /g, "");
	return str
}

//取出字符串，并且截取相应的字数
function sub_string01(str, length) {
	var str = str;
	str = str.replace(/<\/?.+?>/g, "").replace(/ /g, "");
	if(str.length > length) {
		return str.substring(0, length) + "..."
	}
	return str
}

//时间戳:获得年月日      得到日期oTime  
function format(time, format) {
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

function to_page(page, args) {
	var url = timestamp("./" + page + ".html");
	for(var i in args) {
		params.put(i, args[i]);
	}
	$("#container").load(url);
}

/* 定义头部的方法 */
function get_common_head() {
	$("#common_head").load("/citylightsweb/common_head.html");
}

/* 定义尾部的方法 */
function get_common_footer() {
	$("#common_footer").load("/citylightsweb/common_footer.html");
	$("#common_footer_lang").load("");
}
/* 定义登录的方法 */
function get_login_bomb_box() {
	$("#login_bomb_box").load("");
}


//点击显示隐藏登录框
function get_login_bomb_box_login() {
	$(".dialog").fadeIn();
	$("#login_bomb_box").on('click', '.dialog .dialog_main .dialog_main_title span', function() {
		$(".dialog").fadeOut();
	});
}

//详情页操作框
function detail_opra_1512358400205() {
	$('#detail_opra_1512358400205').load('../detail_opra_1512358400205.html')
}

//信用更多
function creditgetNewsMore() {
    openWin('credit_news_more.html');
}

//获得年月日 得到日期oTime
function getMyDate(str) {

    if(str!=''){
        var oDate = new Date(str), oYear = oDate.getFullYear(), oMonth = oDate
                    .getMonth() + 1, oDay = oDate.getDate(), oHour = oDate.getHours(), oMin = oDate
                .getMinutes(), oSen = oDate.getSeconds(),
            // oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour)
            // +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
            oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay);// 最后拼接时间
        return oTime;
    }else{
        return str;
    }

};

function getMyDate1(str) {

    if(str!=''){
        var oDate = new Date(str), oYear = oDate.getFullYear(), oMonth = oDate
                    .getMonth() + 1, oDay = oDate.getDate(), oHour = oDate.getHours(), oMin = oDate
                .getMinutes(), oSen = oDate.getSeconds(),
            // oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour)
            // +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
            oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen); //最后拼接时间
        return oTime;
    }else{
        return str;
    }

};
//补0操作
function getzf(num) {
	if(parseInt(num) < 10) {
		num = '0' + num;
	}
	return num;
}

//注意：上传，包括查看的时候这个地址不要再页面里边放。。。
var urldata = 'http://file.gcx365.com:8090/';
$(function() {
	//get_day_remind();
});
$(function() {
	$('.menu .menu_par p').on('click', function() {
		$('.menu .menu_par p').css({
			'background': '#f6f9fa',
			'color': '#333'
		});
		$('.menu .menu_par p em').removeClass('on');
		$(this).css({
			'background': '#e34e42',
			'color': '#fff'
		});
		$(this).find('em').addClass('on')
		$(this).siblings('.menu_list').animate({
			'height': 'toggle'
		}, 'show');
		$(this).parent('.menu_par').siblings('.menu_par').find('.menu_list').slideUp();
		$('.menu li').find('a').css('color', '#333');
		$('.menu li').find('span').css('background', '#333');
	});
	$('.menu .menu_list li').on('click', function() {
		$('.menu li').find('a').css('color', '#333');
		$('.menu li').find('span').css('background', '#333');
		$(this).find('a').css('color', '#e34e42');
		$(this).find('span').css('background', '#e34e42');
	});
});

function get_model(model) {
	$("#area").load(model + '.html');
}

//共享协作页面
function get_ipccn(model, id, type) {
	var v = model+"&cityCode="+cityCode;
	if(id != undefined) {
		v = model+"&id=" + id+ "&cityCode=" + cityCode;
		if(type != undefined) {
			v = model+"&id=" + id + "&type=" + type + "&cityCode=" + cityCode;
		}
	}
	window.open("/tipmweb/fs_container.html?parameter=" + v, "_self");
}
function get_ipccn_blank(model, id, type) {
	var v = model + "&cityCode=" + platform_cityCode;
	if (id != undefined) {
		v = model + "&id=" + id + "&cityCode=" + platform_cityCode;
		if (type != undefined) {
			v = model + "&id=" + id + "&type=" + type + "&cityCode=" + platform_cityCode;
		}
	}
	window.open("/tipmweb/fs_container.html?parameter=" + v, "_blank");
}
//新闻列表页
function new_more(num) {
	window.open("news_more.html?num=" + num + "&cityCode=" + cityCode, "_blank")
}
//新闻列表页
function new_more_big(num) {
	window.open("news_more_big.html?num=" + num + "&cityCode=" + cityCode, "_blank")
}

//打开新标签  name:新标签页名称
function open_tag(name) {
	window.open(name + ".html?cId=" + GetQueryString("cId"), "_blank")
}
//空值转换
function checkNull(aa) {
	return aa == null || aa == undefined || aa == 'undefined'? "":aa;
}
//X轴坐标点获取
function xAxis(startTime, endTime, type) {
	if(!startTime) {
		alert('请选择起始时间')
		return
	}
	if(!endTime) {
		alert('请选择结束时间')
		return
	}
	if(!type) {
		alert('请选择时间间隔来展示数据')
		return
	}
	var startTimes = new Date(startTime).getTime()
	var endTimes = new Date(endTime).getTime()

	if(startTimes > endTimes) {
		alert('起始时间大于结束时间，请重新选择时间范围')
		return
	}

	// Xarr = xAxisToM(startTime,endTime,type);
	var resultArr = []
	var dayArr = []
	switch(type) {
		case "3":
			for(var i = startTimes; i < endTimes; i += 2592000000) {
				dayArr.push(i)
			}
			$.each(dayArr, function(index, item) {
				var item = getzf((new Date(item).getMonth() + 1)) + '月'
				resultArr.push({
					time: item
				})
			})
			break;
		case "2":
			for(var i = startTimes; i < endTimes; i += 86400000) {
				if(new Date(i).getDay() == 1) {
					dayArr.push(i)
				}
			}
			$.each(dayArr, function(index, item) {

				var item = "00" + String(new Date(item).getFullYear()).substring(2) + '-' + getzf((new Date(item).getMonth() + 1)) + '-' + getzf(new Date(item).getDate()) + '当周'
				resultArr.push({
					time: item
				})
			})
			break;
		case "1":
			for(var i = startTimes; i < endTimes; i += 86400000) {
				dayArr.push(i)
			}
			$.each(dayArr, function(index, item) {
				var item = getzf((new Date(item).getMonth() + 1)) + '-' + getzf(new Date(item).getDate())
				resultArr.push({
					time: item
				})
			})
			break;
		case "0":
			for(var i = startTimes; i < endTimes; i += 3600000) {
				dayArr.push(i)
			}
			$.each(dayArr, function(index, item) {
				var item = getzf((new Date(item).getMonth() + 1)) + '-' + getzf(new Date(item).getDate()) + ' ' + getzf(new Date(item).getHours()) + ':00'
				resultArr.push({
					time: item
				})
			})
			break;
	}
	return resultArr
	// console.log(resultArr)
}

//登录框
function get_login_bomb_box_login() {
	$(".dialog").fadeIn();
	$("#login_bomb_box").on('click', '.dialog .dialog_main .dialog_main_title span', function() {
		$(".dialog").fadeOut();
	});
}
/* 定义登录的方法 */
$("#login_bomb_box").load("./login_bomb_box.html");

function addCookie(name,value,iDay){
    if(iDay){
        //设置过期时间
        var oDate = new Date();
        oDate.setDate(oDate.getDate()+iDay);
        document.cookie = name+'='+value+'; PATH=/; EXPIRES='+oDate.toGMTString();
    }else{
        //默认不设置过期时间
        document.cookie = name+'='+value+'; PATH=/';
    }
}

/*
 ** 	getCookie 		获取一个cookie
 ** 	params
 ** 				name 		[String]
 */
function getCookie(name){
    //name=李四; age=18; sex=男; weight=50
    var arr = document.cookie.split('; ');
    for(var i=0;i<arr.length;i++){
        var arr2 = arr[i].split('=');
        if(arr2[0]==name){
            return arr2[1];
        }
    }
}

/*
 ** 	removeCookie 		删除一个cookie
 ** 	params
 ** 				name 		[String]
 */
function removeCookie(name){
    addCookie(name,1,-1);
}
// showNowTime()
//获取当前时间
function showNowTime() {

	var myDate = new Date();
	//获取当前年
	var year = myDate.getFullYear();
	//获取当前月
	var month = myDate.getMonth() + 1;
	//获取当前日
	var date = myDate.getDate();
	var h = myDate.getHours(); //获取当前小时数(0-23)
	var m = myDate.getMinutes(); //获取当前分钟数(0-59)
	var s = myDate.getSeconds();

	var now = year + '-' + month + "-" + date + " " + h + ':' + m + ":" + s;
}




拖拽开始
function dragc() {
		    var obj = $('#custompop');
		    obj.bind('mousedown', start);
		    function start(e) {
		        var ol = obj.offset().left;
		        var ot = obj.offset().top;
		        deltaX = e.pageX - ol;
		        deltaY = e.pageY - ot;
		        $(document).bind({
		            'mousemove': move,
		            'mouseup': stop
		        });
		        return false;
		    }
		    function move(e) {
		        obj.css({
		            "left": (e.pageX - deltaX),
		            "top": (e.pageY - deltaY)
		        });
		        return false;
		    }
		    function stop() {
		        $(document).unbind({
		            'mousemove': move,
		            'mouseup': stop
		        });
		    }
		}
dragc();


//拖拽结束




//获取cur参数
function GetCid(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);

	if(r != null) return unescape(r[2]);
	return null;

};

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);

	if(r != null) return unescape(r[2]);
	return null;
}

function getSearchString(key) {
	// 获取URL中?之后的字符
	var str = location.search;
	str = str.substring(1, str.length);

	// 以&分隔字符串，获得类似name=xiaoli这样的元素数组
	var arr = str.split("&");
	var obj = new Object();

	// 将每一个数组元素以=分隔并赋给obj对象
	for(var i = 0; i < arr.length; i++) {
		var tmp_arr = arr[i].split("=");
		obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
	}
	return obj[key];
}
function getParams(key) {
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2]);
	}
	return null;
};




var comUserid=''; //当前登录账户的UserId
//登录方法
function Login() {
	$.ajax({
		url: "/usermanage/userController/isLogin.do",
		type: "post",
		dataType: "json",
		data: {},
		success: function(data) {

			if(data.data === "请登录") {
				$('#userCenterLi').hide()
				$('#userLogin').show()
				$('#login_html').text('')
			} else {
				$("#login_html").text('欢迎您，'+data.data.userName);
				$('#userLogin').hide()
				$('#userCenterLi').show()
				comUserid=data.data.userId;  //UserId
			}
		},
		error:function(){
			$('.compName').html('')
		}
	});
}


//退出登陆的方法
function signOut() {
	$.ajax({
		url: '/usermanage/userController/dropout.do',
		type: 'post',
		async: true,
		data: {},
		dataType: 'json',
		success: function (result) {
			if (result.status == 0) {
				$('#login_html').text('');
				removeCookie("userName");
				removeCookie("userId");
				//window.location.reload();
				window.location.href='/creditchina/index.html?cityCode='+cityCode

			} else {
				alert(result.data);
			}
		},
		error: function () {
			alert("error");
		}
	});
}



function getSearchString(key) {
	// 获取URL中?之后的字符
	var str = location.search;
	str = str.substring(1, str.length);

	// 以&分隔字符串，获得类似name=xiaoli这样的元素数组
	var arr = str.split("&");
	var obj = new Object();

	// 将每一个数组元素以=分隔并赋给obj对象
	for(var i = 0; i < arr.length; i++) {
		var tmp_arr = arr[i].split("=");
		obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
	}
	return obj[key];
}



//获得年月日 得到日期oTime
function getMyDate(str) {

	if(str!=''){
		var oDate = new Date(str), oYear = oDate.getFullYear(), oMonth = oDate
				.getMonth() + 1, oDay = oDate.getDate(), oHour = oDate.getHours(), oMin = oDate
				.getMinutes(), oSen = oDate.getSeconds(),
			// oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour)
			// +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
			oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay);// 最后拼接时间
		return oTime;
	}else{
		return str;
	}

};
//补0操作
function getzf(num) {
	if(parseInt(num) < 10) {
		num = '0' + num;
	}
	return num;
}
//获取cityCode
function GetCid(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);

	if(r != null) return unescape(r[2]);
	return null;

};


(function() {
	Date.prototype.format = function(format){ 
		var o = { 
		"M+" : this.getMonth()+1, //month 
		"d+" : this.getDate(), //day 
		"h+" : this.getHours(), //hour 
		"m+" : this.getMinutes(), //minute 
		"s+" : this.getSeconds(), //second 
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
		"S" : this.getMilliseconds() //millisecond 
		} 

		if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		} 

		for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
		format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
		} 
		return format; 
	} 
	var App = {};
	
	var util = App.util = {};
	util.executeCmd = function(action, params, method) {
		return $.ajax({
			type : "post",
			url : "cmd?r=" + parseInt(Math.random()*100000),
			data : {
				action: action,
				params: JSON.stringify(params),
				method: method || "get"
			},
			async : false,
			error: function(e){
				var winConfirm = $(".xcConfirm");
				if(winConfirm){
					winConfirm.remove();
				}
				window.wxc.xcConfirm("该操作导致数据出现异常，请通知管理员查找异常原因！", window.wxc.xcConfirm.typeEnum.error,{onOk:function(){location.reload(true);}});
			}
		});
	};
	util.executeCmdSys = function(action, params, method) {
		return $.ajax({
			type : "post",
			url : "cmd?r=" + parseInt(Math.random()*100000),
			data : {
				action: action,
				params: JSON.stringify(params),
				method: method || "get"
			},
			async : false,
			error: function(e){
				var winConfirm = $(".xcConfirm");
				if(winConfirm){
					winConfirm.remove();
				}
				window.wxc.xcConfirm("该操作导致数据出现异常，请通知管理员查找异常原因！", window.wxc.xcConfirm.typeEnum.error,{onOk:function(){location.reload(true);}});
			}
		});
	};
	util.getUrlParam = function(name)
	{
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r!=null) return unescape(r[2]); return null; //返回参数值
	};
	util.isNullorEmpty = function(info)
	{
		if(info==null || info==''||info==undefined){
			return true;
		}else{
			return false;
		}
	};
	util.waterfull=function() {
		var doc_w = document.getElementById('waterfull').offsetWidth; // 获取页页宽度
		var lis = document.getElementsByClassName('waterli'); // 获取页面中定位元素集合
		if(lis.length>0){
			var li_w = lis[0].offsetWidth; // 获取页面中定位元素的宽度
			var n = Math.floor(doc_w / li_w); // 计算出每一行放置定位元素的个数
			var h = []; // 定义一个数组用来实时记录每列的高度
			for(var i=0; i<lis.length; i++) {

			    var li_h = lis[i].offsetHeight; // 每个定位元素的高度值
			    if(i < n) { // 第一行top值都等于0; left 等于定位元素的下标乘以定宽
			        lis[i].style.top = 0;
			        lis[i].style.left = i * li_w + 'px';
			        h[i] = li_h;
			        
			    } else if(i > n) {
			    	h[i] = li_h;
				    lis[i].style.left = (i%n ) * li_w +'px';
				    lis[i].style.top = h[i-n] + parseInt(lis[i-n].style.top) +'px';
			    }else if(i=n){
			    	h[i] = li_h;
				    lis[i].style.left = (i%n) * li_w +'px';
				    lis[i].style.top = h[i-n] + parseInt(lis[i-n].style.top) +'px';
			    }
			}
		}
	};
	
	util.validate = function(form) {
		var ok = true;
		$(form).find(".validate").each(function(index, obj) {
			var attr = null;
			try {
				attr = eval("({" + $(this).attr("rule") + "})");;
			} catch(e) {
			}
			if(attr) {
				var value = $(obj).val();
				var name = attr.name || "";
				var notnull = attr.notnull;
				if(notnull && !value.trim().length) {
					ok = false;
					window.wxc.xcConfirm(name + "不能为空", window.wxc.xcConfirm.typeEnum.warning);
					return false;
				}
				var maxlenth = attr.maxlength;
				if(maxlenth && value.length > maxlenth) {
					ok = false;
					window.wxc.xcConfirm(name + "的最大长度为" + maxlenth, window.wxc.xcConfirm.typeEnum.warning);
					return false;
				}
				var minlenth = attr.minlength;
				if(minlenth && value.length < minlenth) {
					ok = false;
					window.wxc.xcConfirm(name + "的最小长度为" + maxlenth, window.wxc.xcConfirm.typeEnum.warning);
					return false;
				}
				var mobile = attr.mobile;
				if(mobile && !/^1[0-9]{10}$/.test(value)) {
					ok = false;
					window.wxc.xcConfirm("请填入正确的手机号", window.wxc.xcConfirm.typeEnum.warning);
					return false;
				}
				var number = attr.number;
				if(number && !/^[1-9]+[0-9]*]*$/.test(value)){
					ok = false;
					window.wxc.xcConfirm(name + "必须为数字！", window.wxc.xcConfirm.typeEnum.warning);
					return false;
				}
				var amount = attr.amount;
				if(amount && !/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(value)){
					ok = false;
					window.wxc.xcConfirm(name + "必须为数字，且最多保留两位小数!", window.wxc.xcConfirm.typeEnum.warning);
					return false;
				}
			}
		});
		return ok;
	};
	App.register = function(action, params, method) {
		return $.ajax({
			type : "post",
			url : "register?r=" + parseInt(Math.random()*100000),
			data : {
				action: action,
				params: JSON.stringify(params),
				method: method || "get"
			},
			async : false,
			error: function(e){
				var winConfirm = $(".xcConfirm");
				if(winConfirm){
					winConfirm.remove();
				}
				window.wxc.xcConfirm("注册账号时出现异常，请通知管理员查找异常原因！", window.wxc.xcConfirm.typeEnum.error,{onOk:function(){location.reload(true);}});
			}
		});
	};
	App.login = function(mobile, password) {
		return $.ajax({
			type : "post",
			url : "login?r=" + parseInt(Math.random()*100000),
			data : {
				mobile: mobile,
				password: password
			},
			async : false,
			error: function(e){
				var winConfirm = $(".xcConfirm");
				if(winConfirm){
					winConfirm.remove();
				}
				window.wxc.xcConfirm("登陆账号时出现异常，请通知管理员查找异常原因！", window.wxc.xcConfirm.typeEnum.error,{onOk:function(){location.reload(true);}});
			}
		});
	};
	App.quit = function(){
		return $.ajax({
			type : "get",
			url : "quit?r=" + parseInt(Math.random()*100000),
			data : {
				
			},
			async : false,
			error: function(e){
				var winConfirm = $(".xcConfirm");
				if(winConfirm){
					winConfirm.remove();
				}
				window.wxc.xcConfirm("账号退出时出现异常，请通知管理员查找异常原因！", window.wxc.xcConfirm.typeEnum.error,{onOk:function(){location.reload(true);}});
			}
		});
	};
	App.getCurrentUser = function() {
		return $.ajax({
			type : "post",
			url : "main?r=" + parseInt(Math.random()*100000),
			data : {},
			async : false,
			error: function(e){
				var winConfirm = $(".xcConfirm");
				if(winConfirm){
					winConfirm.remove();
				}
				window.wxc.xcConfirm("获取当前用户信息时出现异常，请通知管理员查找异常原因！", window.wxc.xcConfirm.typeEnum.error,{onOk:function(){location.reload(true);}});
			}
		});
	};
	window.App = App;
	
	if (!window.JSON) {
        window.JSON = {
            parse: function (sJSON) {
                return eval('(' + sJSON + ')');
            },
            stringify: (function () {
                var toString = Object.prototype.toString;
                var isArray = Array.isArray || function (a) {
                        return toString.call(a) === '[object Array]';
                    };
                var escMap = {
                    '"': '\\"',
                    '\\': '\\\\',
                    '\b': '\\b',
                    '\f': '\\f',
                    '\n': '\\n',
                    '\r': '\\r',
                    '\t': '\\t'
                };
                var escFunc = function (m) {
                    return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
                };
                var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
                return function stringify(value) {
                    if (value == null) {
                        return 'null';
                    } else if (typeof value === 'number') {
                        return isFinite(value) ? value.toString() : 'null';
                    } else if (typeof value === 'boolean') {
                        return value.toString();
                    } else if (typeof value === 'object') {
                        if (typeof value.toJSON === 'function') {
                            return stringify(value.toJSON());
                        } else if (isArray(value)) {
                            var res = '[';
                            for (var i = 0; i < value.length; i++)
                                res += (i ? ', ' : '') + stringify(value[i]);
                            return res + ']';
                        } else if (toString.call(value) === '[object Object]') {
                            var tmp = [];
                            for (var k in value) {
                                if (value.hasOwnProperty(k))
                                    tmp.push(stringify(k) + ': ' + stringify(value[k]));
                            }
                            return '{' + tmp.join(', ') + '}';
                        }
                    }
                    return '"' + value.toString().replace(escRE, escFunc) + '"';
                };
            })()
        };
    }
	
	App.pageBar = function (pageNum,totalPage,method){
		var pageBar='';
		//初始化分页条,每次当前页始终处于最中间位置，除了开始的几页和最后几页
		var pageStart = 1;
		var pageEnd = 1;
		if(totalPage <= 5){
			//如果小于5页，则只显示1-5页
			pageEnd = totalPage;
		}else if(pageNum + 2 > totalPage){
			//若大于5页，且当前页处于最后5页内,则始终显示最后5页
			pageStart = totalPage - 4;
			pageEnd = totalPage;
		}else {
			pageStart = (pageNum-2)>0 ? pageNum-2 : 1;
			pageEnd = (pageStart+4)<totalPage ? pageStart+4 : totalPage;
		}
		//添加首页和上一页
		pageBar += '<a tabindex="0" class="first ui-corner-tl ui-corner-bl fg-button ui-button ui-state-default" id="DataTables_Table_0_first" onclick="'+method+'(1)">首页</a>';
		pageBar += '<a tabindex="0" class="previous fg-button ui-button ui-state-default" id="DataTables_Table_0_previous" onclick="'+method+'('+ (pageNum-1) +')">上一页</a>';
		pageBar += '<span>';
		for (var i=pageStart;i<=pageEnd; i++){
			if(i == pageNum){
				pageBar += '<a href="javascript:void(0);" tabindex="0" class="fg-button ui-button ui-state-default ui-state-disabled" onclick="'+method+'(' + i + ')">' + i + '</a>';
			}else{
				pageBar += '<a href="javascript:void(0);" tabindex="0" class="fg-button ui-button ui-state-default" onclick="'+method+'(' + i + ')">' + i + '</a>';
			}
		}
		pageBar += ' </span>';
		pageBar += '<a tabindex="0" class="next fg-button ui-button ui-state-default" id="DataTables_Table_0_next" onclick="'+method+'('+ (pageNum + 1) +')">下一页</a>';
		pageBar += '<a tabindex="0" class="last ui-corner-tr ui-corner-br fg-button ui-button ui-state-default" id="DataTables_Table_0_last" onclick="'+method+'('+totalPage+')">尾页</a>';
		$("#DataTables_Table_0_paginate").html(pageBar);
	};
	  
})();
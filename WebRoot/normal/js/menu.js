var currentUser = '';
function quitSystem(){
	App.quit().success(function() {
		window.location.href = "login.html";
	});
}
//isNotLogin是否不用登陆
function banner(index,isNotLogin){
	var bannerHtml = '';
	var defualtLoginHtml = '<a href="login.html">【登录】</a>'
							+ '<a href="register.html">【注册】</a>';
	App.getCurrentUser().success(function(result) {
		currentUser = result;
		if(currentUser&&currentUser.userId){
			defualtLoginHtml = '您好:&nbsp;&nbsp;<a href="userindex.html" class="blue ">'+currentUser.nickName+'</a>'
							+	'<a href="javascript:void(0)" onclick="quitSystem()">【退出】</a>';
		}else if(!isNotLogin){
			window.wxc.xcConfirm("登陆超时，请重新登陆!", window.wxc.xcConfirm.typeEnum.warning,{onOk:function(){window.location.href = "login.html";},onCancel:function(){window.location.href = "login.html";},onClose:function(){window.location.href = "login.html";}});
		}
	});
	bannerHtml += '<div class="logo">'
		+	'<img src="normal/images/logo.png" alt="logo" />'
		+	'<span>XXX物业有限公司</span>'
		+ '</div>'
		+ '<div class="headercontent ">'
		+	'<ul>'
		+		'<li'+ (index == 0 ? ' class="on"':'')  +'>'
		+			'<a href="index.html">首页</a>'
		+		'</li>'
		+		'<li'+ (index == 1 ? ' class="on"':'')  +'>'
		+			'<a href="housekeep.html">家政</a>'
		+		'</li>'
		+		'<li'+ (index == 2 ? ' class="on"':'')  +'>'
		+			'<a href="hometeacher.html">家教</a>'
		+		'</li>'
		+		'<li'+ (index == 3 ? ' class="on"':'')  +'>'
		+			'<a href="houserent.html">租房</a>'
		+		'</li>'
		+		'<li'+ (index == 4 ? ' class="on"':'')  +'>'
		+			'<a href="house.html">二手房</a>'
		+		'</li>'
		+		'<li'+ (index == 5 ? ' class="on"':'')  +'>'
		+			'<a href="download.html">APP下载</a>'
		+		'</li>'
		+	'</ul>'
		+ '</div>'
		+ '<div class="res-lo">'
		+	defualtLoginHtml
		+	'</div>';
		$("#banner").html(bannerHtml);
	
}
function rightMenu(index){
	var rightMenuHtml = '';
	var menuUrl = '';
	if(currentUser&&currentUser.userId){
		var roleIds=currentUser.roleIds.split(',');
		roleIds = [0,1,2,3,4,5,6,7,8];
		var flag = [false,false,false,false,false,false,false,false];// 0-7对应菜单是否加载过
  		for(var i=0;i<roleIds.length;i++){
  			//物管管理
  			if(roleIds[i] == "1" && !flag[0]){
  				menuUrl += '<li' + (index == 1 ? ' class="active"':'') + '><a href="userlist.html"><i class="icon icon-home"></i> <span>用户列表</span></a> </li>'
  							+ '<li' + (index == 2 ? ' class="active"':'') + '><a href="costinput.html"><i class="icon icon-home"></i> <span>费用录入</span></a> </li>'
  							+ '<li' + (index == 3 ? ' class="active"':'') + '><a href="arealist.html"><i class="icon icon-signal"></i> <span>小区列表</span></a> </li>'
  							+ '<li' + (index == 4 ? ' class="active"':'') + '><a href="praise.html"><i class="icon icon-inbox"></i> <span>表扬/投诉</span></a> </li>'
  							+ '<li' + (index == 6 ? ' class="active"':'') + '><a href="pubnotice.html"><i class="icon icon-fullscreen"></i> <span>发布公告</span></a></li>'
  							+ '<li' + (index == 7 ? ' class="active"':'') + '><a href="revnotice.html"><i class="icon icon-tint"></i> <span>撤销公告</span></a></li>'
  							+ '<li' + (index == 15 ? ' class="active"':'') + '><a href="pubadvertise.html"><i class="icon icon-tint"></i> <span>发布广告</span></a></li>'
  							+ '<li' + (index == 18 ? ' class="active"':'') + '><a href="pubproduct.html"><i class="icon icon-pencil"></i> <span>发布商品</span></a></li>';
  				flag[0]=true;
  			}
  			//物管业务
  			if(roleIds[i] == "2" && !flag[1]){
  				menuUrl +='';
  				flag[1]=true;
  			}
  			//业主
  			if(roleIds[i] == "3" && !flag[2]){
//  				menuUrl += '<li' + (index == 5 ? ' class="active"':'') + '><a href="makeorder.html"><i class="icon icon-th"></i> <span>客户预约</span></a></li>';
  				flag[2]=true;
  			}
  			//家教
  			if(roleIds[i] == "4" && !flag[3]){
  				menuUrl += '<li' + (index == 8 ? ' class="active"':'') + '><a href="pubhometeacher.html"><i class="icon icon-pencil"></i> <span>发布家教</span></a></li>'
  						+ '<li' + (index == 9 ? ' class="active"':'') + '><a href="modhometeacher.html"><i class="icon icon-file"></i> <span>更改家教</span></a></li>';
  				flag[3]=true;
  			}
  			//家政
  			if(roleIds[i] == "5" && !flag[4]){
  				menuUrl += '<li' + (index == 10 ? ' class="active"':'') + '><a href="pubhousekeep.html"><i class="icon icon-pencil"></i> <span>发布家政</span></a></li>'
  						+ '<li' + (index == 11 ? ' class="active"':'') + '><a href="modhousekeep.html"><i class="icon icon-info-sign"></i> <span>更改家政</span></a></li>';
  				flag[4]=true;
  			}
  			//外卖
  			if(roleIds[i] == "6" && !flag[5]){
  				menuUrl +='';
  				flag[5]=true;
  			}
  			//二手房
  			if(roleIds[i] == "7" && !flag[6]){
  				menuUrl += '<li' + (index == 12 ? ' class="active"':'') + '><a href="pubsecondhouse.html"><i class="icon icon-pencil"></i> <span>发布二手房</span></a></li>'
  						+ '<li' + (index == 16 ? ' class="active"':'') + '><a href="modsecondhouse.html"><i class="icon icon-pencil"></i> <span>更改二手房</span></a></li>'
  						+ '<li' + (index == 13 ? ' class="active"':'') + '><a href="pubrenthouse.html"><i class="icon icon-pencil"></i> <span>发布出租房</span></a></li>'
  						+ '<li' + (index == 17 ? ' class="active"':'') + '><a href="modrenthouse.html"><i class="icon icon-pencil"></i> <span>更改出租房</span></a></li>';
  				flag[6]=true;
  			}
  			//商家账户查询
  			if(roleIds[i] == "8" && !flag[7]){
  				menuUrl += '<li' + (index == 14 ? ' class="active"':'') + '><a href="record.html"><i class="icon icon-pencil"></i> <span>充值记录</span></a></li>';
  				flag[7]=true;
  			}
  		}
  		if(!flag[2] || roleIds.length > 1){
  			menuUrl += '<li' + (index == 5 ? ' class="active"':'') + '><a href="makeorder.html"><i class="icon icon-th"></i> <span>客户预约</span></a></li>';
  		}
		rightMenuHtml += '<a href="#" class="visible-phone"><i class="icon icon-th"></i>Tables</a>'
						+'<ul>'
							+ '<li' + (index == 0 ? ' class="active"':'') + '><a href="userindex.html"><i class="icon icon-home"></i> <span>个人中心</span></a> </li>'
							+ menuUrl
						+ '</ul>';
		$("#sidebar").html(rightMenuHtml);
  	  
	}else{
//		window.location.href = "login.html";
		var roleIds = [0,1,2,3,4,5,6,7,8];
		var flag = [false,false,false,false,false,false,false,false];// 0-7对应菜单是否加载过
  		for(var i=0;i<roleIds.length;i++){
  			//物管管理
  			if(roleIds[i] == "1" && !flag[0]){
  				menuUrl += '<li' + (index == 1 ? ' class="active"':'') + '><a href="userlist.html"><i class="icon icon-home"></i> <span>用户列表</span></a> </li>'
  							+ '<li' + (index == 2 ? ' class="active"':'') + '><a href="costinput.html"><i class="icon icon-home"></i> <span>费用录入</span></a> </li>'
  							+ '<li' + (index == 3 ? ' class="active"':'') + '><a href="arealist.html"><i class="icon icon-signal"></i> <span>小区列表</span></a> </li>'
  							+ '<li' + (index == 4 ? ' class="active"':'') + '><a href="praise.html"><i class="icon icon-inbox"></i> <span>表扬/投诉</span></a> </li>'
  							+ '<li' + (index == 6 ? ' class="active"':'') + '><a href="pubnotice.html"><i class="icon icon-fullscreen"></i> <span>发布公告</span></a></li>'
  							+ '<li' + (index == 7 ? ' class="active"':'') + '><a href="revnotice.html"><i class="icon icon-tint"></i> <span>撤销公告</span></a></li>'
  							+ '<li' + (index == 15 ? ' class="active"':'') + '><a href="pubadvertise.html"><i class="icon icon-tint"></i> <span>发布广告</span></a></li>'
  							+ '<li' + (index == 18 ? ' class="active"':'') + '><a href="pubproduct.html"><i class="icon icon-pencil"></i> <span>发布商品</span></a></li>';
  				flag[0]=true;
  			}
  			//物管业务
  			if(roleIds[i] == "2" && !flag[1]){
  				menuUrl +='';
  				flag[1]=true;
  			}
  			//业主
  			if(roleIds[i] == "3" && !flag[2]){
//  				menuUrl += '<li' + (index == 5 ? ' class="active"':'') + '><a href="makeorder.html"><i class="icon icon-th"></i> <span>客户预约</span></a></li>';
  				flag[2]=true;
  			}
  			//家教
  			if(roleIds[i] == "4" && !flag[3]){
  				menuUrl += '<li' + (index == 8 ? ' class="active"':'') + '><a href="pubhometeacher.html"><i class="icon icon-pencil"></i> <span>发布家教</span></a></li>'
  						+ '<li' + (index == 9 ? ' class="active"':'') + '><a href="modhometeacher.html"><i class="icon icon-file"></i> <span>更改家教</span></a></li>';
  				flag[3]=true;
  			}
  			//家政
  			if(roleIds[i] == "5" && !flag[4]){
  				menuUrl += '<li' + (index == 10 ? ' class="active"':'') + '><a href="pubhousekeep.html"><i class="icon icon-pencil"></i> <span>发布家政</span></a></li>'
  						+ '<li' + (index == 11 ? ' class="active"':'') + '><a href="modhousekeep.html"><i class="icon icon-info-sign"></i> <span>更改家政</span></a></li>';
  				flag[4]=true;
  			}
  			//外卖
  			if(roleIds[i] == "6" && !flag[5]){
  				menuUrl +='';
  				flag[5]=true;
  			}
  			//二手房
  			if(roleIds[i] == "7" && !flag[6]){
  				menuUrl += '<li' + (index == 12 ? ' class="active"':'') + '><a href="pubsecondhouse.html"><i class="icon icon-pencil"></i> <span>发布二手房</span></a></li>'
  						+ '<li' + (index == 16 ? ' class="active"':'') + '><a href="modsecondhouse.html"><i class="icon icon-pencil"></i> <span>更改二手房</span></a></li>'
  						+ '<li' + (index == 13 ? ' class="active"':'') + '><a href="pubrenthouse.html"><i class="icon icon-pencil"></i> <span>发布出租房</span></a></li>'
  						+ '<li' + (index == 17 ? ' class="active"':'') + '><a href="modrenthouse.html"><i class="icon icon-pencil"></i> <span>更改出租房</span></a></li>';
  				flag[6]=true;
  			}
  			//商家账户查询
  			if(roleIds[i] == "8" && !flag[7]){
  				menuUrl += '<li' + (index == 14 ? ' class="active"':'') + '><a href="record.html"><i class="icon icon-pencil"></i> <span>充值记录</span></a></li>';
  				flag[7]=true;
  			}
  		}
  		if(!flag[2] || roleIds.length > 1){
  			menuUrl += '<li' + (index == 5 ? ' class="active"':'') + '><a href="makeorder.html"><i class="icon icon-th"></i> <span>客户预约</span></a></li>';
  		}
		rightMenuHtml += '<a href="#" class="visible-phone"><i class="icon icon-th"></i>Tables</a>'
						+'<ul>'
							+ '<li' + (index == 0 ? ' class="active"':'') + '><a href="userindex.html"><i class="icon icon-home"></i> <span>个人中心</span></a> </li>'
							+ menuUrl
						+ '</ul>';
		$("#sidebar").html(rightMenuHtml);
	}
}
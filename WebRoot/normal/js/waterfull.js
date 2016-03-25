$(function(){
	waterfull();
	function waterfull(){
	var doc_w = document.getElementById('waterfull').offsetWidth; // 获取页页宽度
	var lis = document.getElementsByClassName('waterli'); // 获取页面中定位元素集合
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
$(window).resize(function(){
	waterfull();
})
})


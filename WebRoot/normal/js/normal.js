
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
            var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:'28px', height:h, lienHeight:h, paddingLeft:paddingleft, color:'#686868'}).appendTo(self.parent());
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
        });
    }
};
$(function(){
	JPlaceHolder.init();    
	var hei_ = $(window).height();
    $('.leftmenu').css('height',hei_-80)
	$('.loginbg').css('height',hei_);
})

function toggleopen(){
    var wid_ = parseInt($('.leftmenu').css('width'));
    if(wid_ == 300){
        $('.leftmenu').animate({
           width:'60px' 
        },200);
        $('.leftmenu li').animate({
           width:'60px' ,
           height:'80px'
        },200);
        $('.leftmenu a img').animate({
           width:'48px' 
        },200);
        $('.leftmenu a').animate({
           width:'48px' 
        },200);
        $('.leftmenu a div').hide(200);
        $('.ctrol img').attr('src','images/right.png');

    }else{
         $('.leftmenu').animate({
           width:'300px' 
        },200);
        $('.leftmenu li').animate({
           width:'100px' ,
           height:'126px'
        },200);
        $('.leftmenu a img').animate({
           width:'66px' 
        },200);
        $('.leftmenu a').animate({
           width:'66px' 
        },200);
        $('.leftmenu a div').delay(200).show(100);
    }
}


function overlay(){
    var obj = '<div class="overlayll" style="position:fixed;top:0px;left:0px;z-index:2000;'+
               'width:100%;background-color:rgba(2,2,2,.5);*background-color:#222;background-color\0:#222;'+
               'filter:alpha(opacity=50)"></div>';
    var hei_ = $(window).height();  
    $('body').append(obj);
    $('.overlayll').css('height',hei_);
    $('.overlayll').click(function(){
        $('.overlayll').remove();
    })
}

/*function filenamechange(a){
    var this_ = $(a);
    var src_ = this_.siblings('input:file').val();
    var imgsrc_  = src_.lastIndexOf("\\");
    //No file selected
    if(src_ != "没有选中" && src_ != "No file selected"){
        this_.next('img').attr('src', src_)
         this_.next('img').removeClass('hide');
    }
}
*/


function setImagePreview(pid , pimg ,pdiv) {
    var docObj=document.getElementById(pid); 
    var imgObjPreview=document.getElementById(pimg);
    if(!docObj.files || !docObj.files[0]){
    	//火狐下，直接设img属性
        imgObjPreview.style.display = 'block';
        imgObjPreview.style.width = 'auto';
        imgObjPreview.style.maxWidth = '400px';
        imgObjPreview.style.height = 'auto';
        //imgObjPreview.src = docObj.files[0].getAsDataURL();

       //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
        imgObjPreview.src = "normal/images/default.png";
    }
    if(docObj.files && docObj.files[0])
    {
        //火狐下，直接设img属性
        imgObjPreview.style.display = 'block';
        imgObjPreview.style.width = 'auto';
        imgObjPreview.style.maxWidth = '400px';
        imgObjPreview.style.height = '180px';
        //imgObjPreview.src = docObj.files[0].getAsDataURL();

       //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
        imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
    }
    else if (window.navigator.userAgent.indexOf("MSIE") >= 1)
    {
    //IE下，使用滤镜
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById(pdiv);
        //必须设置初始大小
        imgObjPreview.style.width = 'auto';
        imgObjPreview.style.maxWidth = '400px';
        localImagId.style.height = "180px";
    //图片异常的捕捉，防止用户修改后缀来伪造图片
    try{
        localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
    }
    catch(e)
    {
        alert("您上传的图片格式不正确，请重新选择!");
        return false;
    }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
    }
    return true;
    }
function deleteImage(pimg,fileId){
     var imgObjPreview=document.getElementById(pimg);
     var fileObj = document.getElementById(fileId);
     imgObjPreview.src = "normal/images/default.png";
     imgObjPreview.style.height = 'auto';
     fileObj.nextSibling.innerHTML="没有选中";
     fileObj.value="";

}

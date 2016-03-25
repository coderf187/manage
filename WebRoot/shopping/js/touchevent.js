function touchev() {
    var obj = [];
    var init = { x: 5, y: 5 };
    $('.nitem').each(function (i, n) {
        obj[i] = n;
    })
    //console.log(2);
    var sartX, endX ,sTime ,eTime,ismove,startY,endY;

    function touchStart(event) {
      //  event.preventDefault();
        sTime = new Date().getTime();
        var touch = event.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
        if (endX) {
            { ismove = endX;}
        }
    };
    function touchMove(event) {
       // event.preventDefault();       
        var touch = event.touches[0];
        endX = touch.pageX;
        endY = touch.pageY;
    }
    function touchEnd(event) {
       
        // event.preventDefault();
        var hri = Math.abs(endX - startX);
        var ver = Math.abs(endY - startY)
        console.log(hri);
        console.log(ver);
        if (hri > ver && ver < 100) {
       
                if ((startX - endX) > 50) {
        
                    // console.log("左滑");
                    $('.nitem').removeClass('moveleft').addClass('moveright');
                    $(this).removeClass('moveright');
                    $(this).addClass('moveleft');
                    $(this).prev('div').removeClass('moveright');
                    $(this).prev('div').addClass('moveleft');
                    $(this).parent().find('.andelete').addClass('hide');
                }
                if (endX - startX > 50) {
                    //console.log("右滑");
                    if ($(this).hasClass('moveleft')) {
                        $(this).removeClass('moveleft');
                        $(this).addClass('moveright');
                        $(this).prev('div').removeClass('moveleft');
                        $(this).prev('div').addClass('moveright');
                    }
                }
        }   
      
    }
    for (var i =0; i < obj.length; i++) {
        obj[i].addEventListener("touchstart", touchStart, false);
        obj[i].addEventListener("touchmove", touchMove, false);
        obj[i].addEventListener("touchend", touchEnd, false);
    }
    
}
function cancel(a) {
    var this_ = $(a);
    this_.parents('.andelete').addClass('hide');
}
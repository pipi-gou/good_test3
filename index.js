var x = document.getElementById("media");
$(function(){
    //----------页面初始化------------
    var audio = document.getElementById('audio');
    document.addEventListener('DOMContentLoaded', function () {
    function audioAutoPlay() {
        var audio = document.getElementById('audio');
            audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            audio.play();
        }, false);
    }
    audioAutoPlay();
});
    if(sessionStorage.bgmusic=='pause'){
        playBgMusic(false);
    }else{
        playBgMusic(true);
        //----------处理自动播放------------
        //--创建页面监听，等待微信端页面加载完毕 触发音频播放
        document.addEventListener('DOMContentLoaded', function () {
            function audioAutoPlay() {
                playBgMusic(true);
                document.addEventListener("WeixinJSBridgeReady", function () {
                    playBgMusic(true);
                }, false);
            }
            audioAutoPlay();
        });
        //--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
        function audioAutoPlay() {
            playBgMusic(true);
            document.removeEventListener('touchstart',audioAutoPlay);
        }
        document.addEventListener('touchstart', audioAutoPlay);
    }
    //----------处理页面激活------------
    var hiddenProperty = 'hidden' in document ? 'hidden' :
        'webkitHidden' in document ? 'webkitHidden' :
            'mozHidden' in document ? 'mozHidden' :
                null;
    var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    var onVisibilityChange = function(){
        if (!document[hiddenProperty]) {
            if(!sessionStorage.bgmusic||sessionStorage.bgmusic=='play'){
                audio.play();
            }
        }else{
            audio.pause();
        }
    };
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    //---------背景音乐开关----------
    function triggerBgMusic(){
        if(!sessionStorage.bgmusic||sessionStorage.bgmusic=='play'){
            playBgMusic(false);
        }else{
            playBgMusic(true);
        }
    }
    //---------音乐播放和暂停----------
    function playBgMusic(val){
        if(val){
            audio.play();
            sessionStorage.bgmusic='play';
            // document.getElementById('status').innerHTML='正在播放';
        }else{
            audio.pause();
            sessionStorage.bgmusic='pause';
            // document.getElementById('status').innerHTML='停止播放了';
        }
    }
    $("#audio_btn").click(function(){
        $(this).toggleClass("rotate"); //控制音乐图标 自转或暂停

        //控制背景音乐 播放或暂停
        if($(this).hasClass("rotate")){
            playBgMusic(true);
            $(this).addClass("rotate")
        }else{
            playBgMusic(false);
            $(this).removeClass("rotate")
        }
    });
    function isSwiper(changeX,changeY){
        return Math.abs(changeX)>30 || Math.abs(changeY)>30;
    }
    function start(e){
        var point = e.touches[0];
        $(this).attr({
            strX:point.clientX,
            strY:point.clientY,
            changeX:0,
            changeY:0
        });

    }
    function move(e){
        var point = e.touches[0];
        var changeX=point.clientX-$(this).attr('strX');
        var changeY=point.clientY-$(this).attr('strY');
        $(this).attr({
            changeX:changeX,
            changeY:changeY
        })

    }
    function end(e){
        var changeX=parseFloat($(this).attr('changeX'));
        var changeY=parseFloat($(this).attr('changeY'));
        var rotateX=parseFloat($(this).attr('rotateX'));
        var rotateY=parseFloat($(this).attr('rotateY'));
        if (isSwiper(changeX,changeY)===false) return;
        rotateX=rotateX - changeY/2;
        rotateY=rotateY+changeX/3;
        $(this).attr({
            rotateX:rotateX,
            rotateY:rotateY
        }).css('transform','scale(0.4) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)')
    }
    $('.cubebox').attr({
        rotateX:-35,
        rotateY:45
    }).on('touchstart',start).on('touchmove',move).on('touchend',end);


    function r(min=0,max=0) {
        return min + Math.round(Math.random() * (max-min));
    }

//wrap each letter with <span>
    $('#text_1')[0].innerHTML = ('<span>' +  $('#text_1')[0].innerHTML.trim().split('').join('</span><span>') + '</span>');
    var spanAll = $('#text_1 span');
    var frame = 0;

    setInterval(function() {
        if(frame%4==0)
            for(var i = 0; i < spanAll.length; i++)
            {
                spanAll[i].style.opacity = 0;
                spanAll[i].style.color = '#' + r(3,9) + r(3,9) + r(3,9);
                spanAll[i].style.transform = 'translate3d(' + r(-150) + 'px, ' + r(-150) + 'px, 0px) rotate(' + r(-30,30) + 'deg)';
            }

        else if(frame%4==3)
            for(var i = 0; i < spanAll.length; i++)
            {
                spanAll[i].style.opacity = 0;
                spanAll[i].style.transform = 'translate3d(' + r(150) + 'px, ' + r(150) + 'px, 0px) rotate(' + r(-30,30) + 'deg)';
            }

        else
            for(var i = 0; i < spanAll.length; i++)
            {
                spanAll[i].style.transform = '';
                spanAll[i].style.opacity = 1;
            }
        frame++;
    }, 1050);

    $("#text_2").click(function(){
        $("#cubebox").toggleClass("rote"); //控制音乐图标 自转或暂停

    });
    $("#text_2").animatext({speed: 150,
        effect: 'tada',
        random: true,
        infinite: true
    });
    //文字变色
    // var colors = ["#ff2e99", "#ff8a2d", "#ffe12a", "#caff2a", "#1fb5ff", "#5931ff", "#b848ff"]
    //
    // function colorize(text) {
    //     var colorized = ""
    //     var bracket_color = ""
    //     for (i = 0; i < text.length; i++) {
    //         var index = Math.floor(Math.random()*7)
    //         if (text[i] == "(")
    //             bracket_color = colors[index]
    //
    //         color = (bracket_color.length && (text[i] == "(" || text[i] == ")")) ? bracket_color : colors[index]
    //         colorized = colorized + '<span style="color: '+color+' !important">' + text.charAt(i) + '</span>'
    //     }
    //     return colorized
    // }
    // $("#text_2").hover(function(){
    //     $(this).data("text", $(this).text());
    //     $(this).html(colorize($(this).text()));
    // }, function(){
    //     $(this).html($(this).data("text"));
    // });
    //文字高亮
    var span2 = $('#text_2 span span');
    console.log(span2[1]);
    setInterval(function() {
            for(var i = 0; i < span2.length; i++) {
                span2[i].style.opacity = 1;
                span2[i].style.color = '#' + r(3, 9) + r(3, 9) + r(3, 9);
            }


    },3000);

});
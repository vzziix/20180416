// 针对IE10 
if (/*@cc_on!@*/false) { 
document.documentElement.className += ' ie' + document.documentMode; 
} 
// 针对IE11及非IE浏览器， 
// 因为IE11下document.documentMode为11，所以html标签上会加ie11样式类； 
// 而非IE浏览器的document.documentMode为undefined，所以html标签上会加ieundefined样式类。 
if (/*@cc_on!@*/true) { 
document.documentElement.className += ' ie' + document.documentMode; 
} 

$(document).ready(function() {
    if (parseInt($(".mobile_pagetitle").css("height"))) {
        var currentHeight =   parseInt($(".mobile_pagetitle").css("height")) + 2 * parseInt ($(".mobile_pagetitle").css("margin-top"));
        // $("#menubtn_fixed").css("height",currentHeight);
        // $("#menubtn_fixed").css("width",currentHeight * 1.344);
        // $("#menubtn").css("height",currentHeight);
        // $("#menubtn").css("width",currentHeight * 2);
        // $(".mobile_pagetitle").css("right", currentHeight*1.1);
        // console.log(1.3 * currentHeight + parseInt($(".mobile_pagetitle").css("width")));
        // console.log("currentHeight:"+ currentHeight);
        // console.log("title width:"+parseInt($(".mobile_pagetitle").css("width")));
        $(".fixedbar img").css("width", 1.3 * currentHeight + parseInt($(".mobile_pagetitle").css("width")));
        $(".fixedbar img").css("height",currentHeight);
    } else {        
        $(".eico_black").css("height",parseInt($(window).width()) * 0.16);
        $(".eico_black").css("margin-right",parseInt($(window).width()) * 0.14);       
        $(".eico_black").css("width",parseInt($(window).width()) * 0.16/104*122);
        $(".fixedbar img").css("height", parseInt($(window).width()) * 0.16);
        $(".fixedbar img").css("width", parseInt($(window).width()) * 0.32);
        $(".fixedbar img").css("margin-right", parseInt($(window).width()) * -0.33);
        // console.log("index");
    }
    screen && screen.height && $(".mobile_menu_open").css("height", screen.height);
    $(".mobile.banner").css("height",$(window).width());
    $(".mobile.photowallbanner").css("height",$(window).width());
    

$(window).resize(function() {
    if (parseInt($(".mobile_pagetitle").css("height"))) {
        var currentHeight =   parseInt($(".mobile_pagetitle").css("height")) + 2 * parseInt ($(".mobile_pagetitle").css("margin-top"));
        // $("#menubtn_fixed").css("height",currentHeight);
        // $("#menubtn_fixed").css("width",currentHeight * 1.344);
        // $("#menubtn").css("height",currentHeight);
        // $("#menubtn").css("width",currentHeight * 1.344);
        // $(".mobile_pagetitle").css("right", currentHeight*1.1);
        // console.log(1.3 * currentHeight + parseInt($(".mobile_pagetitle").css("width")));
        // console.log("currentHeight:"+ currentHeight);
        // console.log("title width:"+parseInt($(".mobile_pagetitle").css("width")));
        $(".fixedbar img").css("width", 1.3 * currentHeight + parseInt($(".mobile_pagetitle").css("width")));
        $(".fixedbar img").css("height",currentHeight);
    } else {
        $(".eico_black").css("height",parseInt($(window).width()) * 0.16);
        $(".eico_black").css("margin-right",parseInt($(window).width()) * 0.14);       
        $(".eico_black").css("width",parseInt($(window).width()) * 0.16/104*122);
        $(".fixedbar img").css("height", parseInt($(window).width()) * 0.16);
        $(".fixedbar img").css("width", parseInt($(window).width()) * 0.32);
        $(".fixedbar img").css("margin-right", parseInt($(window).width()) * -0.33);
        // console.log("index");
    }
});

    window.onscroll = function() {
        if (document.documentElement.scrollTop + document.body.scrollTop > 20) {
            $(".mobile_pagetitle").css("color", "#000000");
            $(".fixedbar").slideDown("fast");    
        } else {
            $(".fixedbar").slideUp("fast");
        }

        if (document.documentElement.scrollTop + document.body.scrollTop > 68) {
            // console.log("68");
            $(".menu").addClass("scrolled");
            $(".menu").css("background-color", "#ffffff");
            $(".menu .leftmenu li a").css("color", "black");
            $(".menu .rightmenu li a p").css("color", "#8d8d8d");
            $(".pcmenu_container a img").attr("src", templateUrl+"/images/eico_logo.svg");
        } else {
            $(".menu").removeClass("scrolled");
            $(".menu").css("background-color", "rgba(255,255,255,0)");
            $(".menu .rightmenu li a p").css("color", "#ffffff");
            $(".menu .leftmenu li a").css("color", "white");
            $(".pcmenu_container a img").attr("src", templateUrl+"/images/eico_logo_white.svg");
        }
    }

    $(".mobile_menu_open_bg").on("click", function() {
        $("#menuclosebtn").trigger("click");
    });

    $(".contact-mask").on("click", function() {
        $(".contact-close").trigger("click");
    });
    $(".menu li").hover(
        function() {
            $(".current").addClass("nocurrent");
            $(".current").removeClass("current");
            $(this).find("p").addClass("hover");
        },
        function() {
            $(".nocurrent").addClass("current");
            $(".nocurrent").removeClass("nocurrent");
            $(this).find("p").removeClass("hover");
        });
    $(".case").hover(
        function() {
            $(this).find(".description_container").slideDown();　
        },
        function() {
            $(this).find(".description_container").slideUp();　　
        }
    );
    $("#menubtn").on("click",
            function() {
                $(".mobile_pagetitle").css("color" ,"black");
                $("body").addClass("menu_open");
                $("html").addClass("menu_open");
                $(".mobile_menu_open").slideDown("fast");
            }),
        $("#menuclosebtn").on("click",
            function() {
                if (document.documentElement.scrollTop + document.body.scrollTop < 20) {
                    $(".mobile_pagetitle").css("color" ,"white");
                }
                $("body").removeClass("menu_open");
                $("html").removeClass("menu_open");
                $(".mobile_menu_open").slideUp("fast");
            });
    $('.video-play-btn').on('click', function(event) {
        var coverEl = $(this).next('.video-cover'),
            videoUrl = coverEl.attr("video_src"),
            videoID = (videoUrl.split("sid/")[1]).split("/v.swf")[0];

        coverEl.replaceWith('<embed src="' + videoUrl + '?VideoIDS=' + videoID + '&isAutoPlay=true&isShowRelatedVideo=false&showAd=0" allowFullScreen="true" quality="high" width="' + coverEl.css("width") + '" height="' + coverEl.css("height") + '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>');
        coverEl.hide();
        $(this).hide();
    });

    $(".eico_black").on("click", function(){
        $(".mobile_menu_open").slideDown("fast");
    });   

    $(".fixedbar img").on("click", function(){
        $(".mobile_menu_open").slideDown("fast");
    });   

    $(".mobile_pagetitle").on("click", function(){
        $(".mobile_menu_open").slideDown("fast");
    });
    
    $("#menubtn_fixed").on("click",
            function() {
                $(".mobile_menu_open").slideDown("fast");
            }),
        $("#menuclosebtn").on("click",
            function() {
                $(".mobile_menu_open").slideUp("fast");
            });

    $("#wechat").on("click",
            function() {
                $(".wechat-dialog-container").css("display", "block")
            }),
        $(".dialog-close").on("click",
            function() {
                $(".wechat-dialog-container").css("display", "none")
            });
    $("#contact").on("click",
            function() {
                $(".contact-dialog-container").css("display", "block");
                $(".send-dialog-container .send-dialog .send-content p").css("margin-top", "10px");
                if ($(window).height() - document.body.scrollTop - $(".contact-content").height() > 10) {
                    $(".contact_dialog_container").css("margin-top", document.body.scrollTop + 10);
                } else {
                    $(".contact_dialog_container").css("margin-top", $(window).height() - $(".contact-content").height());
                    $("body").scrollTop($(window).height() - $(".contact-content").height() - 10);
                }
            }),
        $(".contact-close").on("click",
            function() {
                $(".contact-dialog-container").css("display", "none");
                $(".send-dialog-container .send-dialog .send-content p").css("margin-top", "-70px");
            });
    $("#tocontact").on("click",
            function() {
                $(".contact-dialog-container").css("display", "block");
                if ($(window).height() - document.body.scrollTop - $(".contact-content").height() > 10) {
                    $(".contact_dialog_container").css("margin-top", document.body.scrollTop + 10);
                } else {
                    $(".contact_dialog_container").css("margin-top", $(window).height() - $(".contact-content").height());
                    $("body").scrollTop($(window).height() - $(".contact-content").height() - 10);
                }
            }),
        $(".contact-close").on("click",
            function() {
                $(".contact-dialog-container").css("display", "none");
                $(".send-dialog-container .send-dialog .send-content p").css("margin-top", "-70px");
            });
    $("#chance").on("click",
            function() {
                $(".contact-dialog-container").css("display", "block");               
                $(".contact_dialog_container").css("margin-top", $(window).height() - $(".contact-content").height());
                $("body").scrollTop($(window).height() - $(".contact-content").height() - 200);
            }),
        $(".contact-close").on("click",
            function() {
                $(".contact-dialog-container").css("display", "none");
                $(".send-dialog-container .send-dialog .send-content p").css("margin-top", "-70px");
            });
    $("#wechat2").on("click",
            function() {
                $(".wechat-dialog-container").css("display", "block");
            }),
        $(".dialog-close").on("click",
            function() {
                $(".wechat-dialog-container").css("display", "none");
            });
    $(".wechat-mask").on("click", function() {
        $(".wechat-dialog-container").css("display", "none");
    });
    $(".labelbtn").on("click", function() {
        $(".labelbtn").removeClass("labelbtn_active");
        $(this).addClass("labelbtn_active");
    });

    function shareToSina(title) {
        var params = { title: title, appkey: 2862561135, url: window.location };
        var temp = [];
        for (var p in params) temp.push(p + '=' + encodeURIComponent(params[p] || ''))
        window.open("http://service.weibo.com/share/share.php?" + temp.join('&'), "", "height=300, width=300, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no")
    }
    $("#weiboshare").on("click", function() {
        shareToSina($('h1', '.content').text());
    });

    var tempqrcode = null,
        tempcontext = null;
    $("#wechatshare")
        .on("click", function() {
            tempqrcode = $(".dialog-qrcode").html();
            tempcontext = $(".dialog-context").html();
            $(".dialog-context").html("扫描二维码,<br/>分享到微信");
            $(".dialog-qrcode").html("");
            $(".dialog-qrcode").qrcode({ width: 140, height: 140, text: window.location.href });
            $(".wechat-dialog-container").css("display", "block");
            $(".dialog-close")
                .on("click", function() {
                    if (tempcontext != null) {
                        $(".dialog-context").html(tempcontext);
                        $(".dialog-qrcode").html(tempqrcode);
                    }
                    $(".wechat-dialog-container").css("display", "none");
                });
        });
});

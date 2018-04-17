var BOTTOM_OFFSET = 600;
var loadflag = 0;
var marginleft = 0;

$(document).ready(function() {
    window.onscroll = function() {
        if (document.documentElement.scrollTop + document.body.scrollTop > 20) {
            $(".mobile_pagetitle").css("color", "#000000");
            $(".fixedbar").slideDown("fast");
        } else {
            $(".fixedbar").slideUp("fast");
            $(".mobile_pagetitle").css("color", "#ffffff");
        }

        if (document.documentElement.scrollTop + document.body.scrollTop > 68) {
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
    var projectpheight = 0;
    for (var i = 0; i < $(".project").length; i++) {
        if (parseInt($($(".project")[i]).find("p").css("height")) > projectpheight) {
            projectpheight = parseInt($($(".project")[i]).find("p").css("height"));
        }
    }
    $(".project > p").css("height", projectpheight);


    $(window).scroll(function() {
        var $currentWindow = $(window);
        var scrollTop = $currentWindow.scrollTop();
        if (loadflag == 0 && (BOTTOM_OFFSET + scrollTop) >= $(".ajax_posts").height() && getParameterByName("label")) {
        	console.log("--------------滚动发起加载-------------");
            load_ajax_posts();
        }
    });

    $(".labelbtn").on("click", function() { 
        if (this.value == "all") {
            window.location = siteUrl+"/product/?label=" + "all";
        } else if (this.value == "精选案例") {
            window.location = siteUrl+"/product/";
        } else {
            window.location = siteUrl+"/product/?label=" + $(this).val();
        }
    });
    $("#toall").on("click", function() {
        window.location = siteUrl+"/product/?label=" + "all";
    });
    if (getParameterByName("label")) {
        // $("#toall").show();
        $("body").scrollTop($(".labellist").offset().top - 68);
        var currentlabel = ".labelbtn[value='" + getParameterByName("label") + "']";
        console.log("---------读取label参数发起加载---------");
        if ($(currentlabel)[0]) {
            $($(currentlabel)[0]).addClass("labelbtn_active");
            $($(currentlabel)[1]).addClass("labelbtn_active");
            load_ajax_posts();
        } else {
            $(".labelbtn").removeClass("labelbtn_active");
            load_ajax_posts();
        }
        if (getParameterByName("label") == "all") {
            // $("#toall").hide();
        }
    } else {
        $("#toall").show();
        $(".labelbtn[value='精选案例']").addClass("labelbtn_active");
        console.log("-----------精选加载-----------");
        load_ajax_posts();
    }
    $(document).on('click', '.video-detail', function() {
        window.location = $(".video-link").attr("href");
    });


    $(".video-mask").on("click", function() {
        $(".video-dialog-container").css("display", "none");
        $(".video_full").attr("src", "");
        $(".video-name").html();
        $(".video-title").html();
        $(".video-link").attr("href", "");
        $(".video_full").removeClass("playit");
    });

    $(".video-close").on("click", function() {
        $(".video-dialog-container").css("display", "none");
        $(".video_full").attr("src", "");
        $(".video-name").html();
        $(".video-title").html();
        $(".video-link").attr("href", "");
        $(".video_full").removeClass("playit");
    });

    $(document).on('click', '.playinfo', function() {
        if ( $(this).attr("link")) {
            $(".video-detail").show();
            $(".video-link").attr("href", $(this).attr("link"));
            if ($(this).attr("name") && $(this).attr("title")) {
            $(".video-name").html($(this).attr("name"));
            $(".video-title").html($(this).attr("title"));
            }
        } else {
            $(".video-detail").hide();
        }

        $(".video-dialog-container").css("display", "block");
        $(".video_full").attr("src", $(this).nextAll('img.poster').first().attr("video-src"));
        $(".video_full").addClass("playit");
        document.getElementsByClassName("playit")[0].play();

        if ($(".video-detail").css("display") == "none") {
            $(".video-content").css("margin-top", "0");
        } else {
            $(".video-content").css("margin-top", "-76px");
        }
    });

    var videocount = 0;
    var t = [];
    var request_settimeout = null;

    $(document).on("mouseenter", ".case_dynamicvideo", function(){
        checknopause();
        if (!$(this).find("video")[0]) {    
            var el = $(this).find(".hoverplay");
            request_settimeout = setTimeout(function(){
                el.before('<video autoplay muted class="video_case pc" webkit-playsinline src="' + el.nextAll('img.poster').first().attr("video-src") + '">您的浏览器不支持 video 标签。</video>'); 
                el.prev().hide();
                    el.prev()[0].oncanplay = function() {
                        if (el.attr("playflag") != "1") {
                            el.attr("playflag", "1");
                            loadeddynamic(this);
                        }
                    };   
                videocount++;
            }, 500);
        } else {
            if ($(this).find(".hoverplay").css("display") != "none") {
                if ($(this).find(".hoverplay").attr("playflag")) {
                    $(this).find(".hoverpause")[0].play();
                    $(this).find(".loading_caseimg").css("display", "none");
                    $(this).find(".hoverpause").css("display", "block");
                    $(this).find(".hoverplay").css("display", "none");
                } else {
                }
            } else {           
                if (t[videocount]) {
                    clearTimeout(t[videocount]);
                }     
                $(this).find(".hoverpause")[0].play();
            }
        }
    });

    $(document).on("mouseleave", ".case_dynamicvideo", function(){ 
        if ($(this).find(".hoverplay").css("display") != "none") {
            request_settimeout && clearTimeout(request_settimeout);
        } else {       
            $(this).find(".hoverpause")[0].pause();
            $(this).find(".hoverpause").addClass("videocount" + (videocount - 1));
            t[videocount] = setTimeout("hidevideo(" + (videocount - 1) + ")", 5000);
        }
        checknopause();
    });

    $(document).on('click', '.video_case', function() {
        if ($(this).prevAll('div.playinfo').last().attr("link")) {
            $(".video-detail").show();
            $(".video-link").attr("href", $(this).prevAll('div.playinfo').last().attr("link"));
            if ($(this).prevAll('div.playinfo').last().attr("name") && $(this).prevAll('div.playinfo').last().attr("title")) {
                $(".video-name").html($(this).prevAll('div.playinfo').last().attr("name"));
                $(".video-title").html($(this).prevAll('div.playinfo').last().attr("title"));
            }
        } else {
            $(".video-detail").hide();
        }

        $(".video-dialog-container").css("display", "block");
        $(".video_full").attr("src", $(this).attr("src"));
        $(".video_full").addClass("playit");
        document.getElementsByClassName("playit")[0].play();

        if ($(".video-detail").css("display") == "none") {
            $(".video-content").css("margin-top", "0");
        } else {
            $(".video-content").css("margin-top", "-76px");
        }
    });
    $(document).on('click', '.poster', function() {
        if ($(this).prevAll('div.playinfo').last().attr("link")) {
            $(".video-detail").show();
            $(".video-link").attr("href", $(this).prevAll('div.playinfo').last().attr("link"));
            if ($(this).prevAll('div.playinfo').last().attr("name") && $(this).prevAll('div.playinfo').last().attr("title")) {
                $(".video-name").html($(this).prevAll('div.playinfo').last().attr("name"));
                $(".video-title").html($(this).prevAll('div.playinfo').last().attr("title"));
            }
        } else {
            $(".video-detail").hide();
        }

        $(".video-dialog-container").css("display", "block");
        $(".video_full").attr("src", $(this).attr("video-src"));
        $(".video_full").addClass("playit");
        document.getElementsByClassName("playit")[0].play();

        if ($(".video-detail").css("display") == "none") {
            $(".video-content").css("margin-top", "0");
        } else {
            $(".video-content").css("margin-top", "-76px");
        }
    });

    for (var i = 0; i < $("video.selected_video_case").length; i++) {
        loopplay($("video.selected_video_case")[i]);
    }
    adjustlabel();
});


function checknopause() {
    for (var i = 0; i < $(".hoverpause").length; i++) {
        if ($(".hoverpause")[i].paused == false) {
            $(".hoverpause")[i].currentTime = 0;
            $(".hoverpause")[i].pause();
    		$($(".hoverpause")[i]).next().css("display", "block");
    		$($(".hoverpause")[i]).css("display", "none");
        }
    }
}


function hidevideo(count) {
    element = $(".videocount" + count);
    element.next().css("display", "block");
    element.css("display", "none");
    element[0].currentTime = 0;
}

var plength = 0;

function adjustlabel() {
    if ($(".islabel")) {
        if ($(window).width() > 768) {
            for (var i = 0; i < $(".islabel").length; i++) {
                marginleft = parseFloat($($(".islabel")[i]).prev().css("width")) + 45;
                $($(".islabel")[i]).css("margin-left", marginleft);
            }
        } else {
            for (var i = 0; i < $(".islabel").length; i++) {
                if ($($(".islabel")[i]).parent().parent().hasClass("case_small")) {
                    // $($(".islabel")[i]).prev().css("margin-top", "-62px");
                } else {
                    marginleft = parseFloat($($(".islabel")[i]).prev().css("width")) + 36;
                    $($(".islabel")[i]).css("margin-left", marginleft);
                }
            }
        }
    }
}

var $content = $('.ajax_posts');
var $loader = $('#more_posts');
var ppp = 12;
var offset = $('.case_container').find('.case').length;
var term = "";

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function loopplay(element) {
    element.ontimeupdate = function() { checkTime(element) };
}

function checkTime(element) {
    if (element.currentTime >= 5) {
        element.currentTime = 0;
    }
}

function loaded(element) {
    $(element).parent().prev().css("display", "none");
}

function loadeddynamic(element) {
    $(element).show();
    $(element).addClass("hoverpause");
    $(element).next().hide();
}

function loadeddynamicpic(element) {
    $(element).parent().find(".loading_caseimg").css("display", "none");
}

function load_ajax_posts() {
    loadflag = 1;
    if ($(".labelbtn_active")[0]) {
        term = $(".labelbtn_active").val();
    } else {
        term = getParameterByName("label");
    }
	console.log("offset:"+offset);
	console.log("ppp:"+ppp);
	console.log("term:"+term);
	console.log("-------------------------------------");
    if (!($loader.hasClass('post_loading_loader') || $loader.hasClass('post_no_more_posts'))) {
        $.ajax({
            type: 'POST',
            dataType: 'html',
            url: siteUrl + '/wp-admin/admin-ajax.php?action=eico2016_more_productcase_ajax',
            data: {
                'ppp': ppp,
                'offset': offset,
                'term': term
            },
            beforeSend: function() {
                $(".chekcmore_btn").css("background-color", "#ffffff");
                $(".chekcmore_btn").css("background-position", "40px");
                $(".chekcmore_btn").css("background-image", "url("+templateUrl+"/images/loadicon.png)");
                $(".checkmore").css("margin-left", "20px");
                $(".checkmore").html("努力加载中");
                $(".chekcmore_btn").css("display", "none");
                $("#more_posts").hide();
                $(".casesloading").show();
                $loader.addClass('post_loading_loader');
            },
            success: function(data) {
                var $data = $(data);
                $(".casesloading").hide();
                if ($data.length != 0) {
                    var $newElements = $data.css({ opacity: 0 });
                    $content.append($newElements);
                    $loader.removeClass('post_loading_loader');
                    $newElements.animate({ opacity: 1 });
                    if ($newElements.length >= ppp) {
                        if (term != "58") {
                        // if (term != "48") {
                            $(".chekcmore_btn").css("background-color", "#f4f4f4");
                            $(".chekcmore_btn").css("background-position", "50px");
                            $(".chekcmore_btn").css("background-image", "url("+templateUrl+"/images/moreicon.png)");
                            $(".checkmore").css("margin-left", "25px");
                            $(".checkmore").html("查看更多");
                        } else {
                            $(".chekcmore_btn").css("background-color", "#000000");
                            $(".chekcmore_btn").css("background-image", "none");
                            $(".checkmore").css("margin-left", "0");
                            $(".checkmore").html("没有更多了");
                            $("#more_posts").hide();
                            $loader.removeClass('post_loading_loader').addClass('post_no_more_posts');
                        }
                        loadflag = 0;
                    } else {
                        $(".chekcmore_btn").css("background-color", "#000000");
                        $(".chekcmore_btn").css("background-image", "none");
                        $(".checkmore").css("margin-left", "0");
                        $(".checkmore").html("没有更多了");
                        $("#more_posts").hide();
                        $loader.removeClass('post_loading_loader').addClass('post_no_more_posts');
                    }
                } else {
                    $(".chekcmore_btn").css("background-color", "#000000");
                    $(".chekcmore_btn").css("background-image", "none");
                    $(".checkmore").css("margin-left", "0");
                    $(".checkmore").html("没有更多了");
                    $("#more_posts").hide();
                    $loader.removeClass('post_loading_loader').addClass('post_no_more_posts');
                }
                adjustlabel();

                for (var loadcnt = offset; loadcnt < $(".case_small a").length; loadcnt++) {
                    var el = $(".caseimg")[loadcnt];
                    el.addEventListener("load", function() {
                        loaded(this);
                    });
                }
                if (term == "58" || term == "精选案例") {
                // if (term == "48" || term == "精选案例") {
                    for (var dynamicvideo = 0; dynamicvideo < $(".case_dynamicvideo").length; dynamicvideo++) {
                        var dynamicel = $(".hoverplay")[dynamicvideo];
                        dynamicel.addEventListener("load", function() {
                            loadeddynamicpic(this);
                        });
                    }
                }
                offset = $(".case").length;
                console.log("调整offset为:"+offset);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $loader.html($.parseJSON(jqXHR.responseText) + ' :: ' + textStatus + ' :: ' + errorThrown);
            },
        });
    }
    return false;
}

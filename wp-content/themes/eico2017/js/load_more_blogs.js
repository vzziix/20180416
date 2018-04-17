var $content = $('.ajax_posts');
var $loader = $('#more_posts');
var term_id = $loader.data('category');
var ppp = 30;
var offset = $('.main').find('a').length;
var BOTTOM_OFFSET = 600;  
var loadflag = 0;

load_ajax_posts();
// $loader.on( 'click', load_ajax_posts );



$(document).ready(function () {  
        $(window).scroll(function () {  
            var $currentWindow = $(window); 
            var scrollTop = $currentWindow.scrollTop();  
            if ( loadflag == 0 && (BOTTOM_OFFSET + scrollTop) >= $(".ajax_posts").height()) {  
                load_ajax_posts();  
                // console.log("loading");
                // console.log("Total:" + $(".blog").length);
                loadflag = 1;
            }  
        });  
    });  


 
function load_ajax_posts() {
    if (!($loader.hasClass('post_loading_loader') || $loader.hasClass('post_no_more_posts'))) {
        $.ajax({
            type: 'POST',
            dataType: 'html',
            url: siteUrl + '/wp-admin/admin-ajax.php?action=eico2016_more_blog_ajax',
            data: {
                'term_id': term_id,
                'ppp': ppp,
                'offset': offset
            },
            beforeSend : function () {
                $loader.addClass('post_loading_loader');
                $(".chekcmore_btn").css("background-color","#ffffff");
                $(".chekcmore_btn").css("background-position","40px");
                $(".chekcmore_btn").css("background-image","url("+siteUrl+"/wp-content/themes/eico2017/images/loadicon.png)");
                $(".checkmore").css("margin-left","20px");
                $(".checkmore").html("努力加载中"); 
                $("#more_posts").hide();
                $(".casesloading").show();             
            },
            success: function (data) {
                var $data = $(data);  
                $(".casesloading").hide();           
                if ($data.length) {
                    var $newElements = $data.css({ opacity: 0 });
                    $content.append($newElements);
                    $loader.removeClass('post_loading_loader');
                    $newElements.animate({ opacity: 1 });
                    $loader.removeClass('post_loading_loader');
                    $(".chekcmore_btn").css("background-color","#f4f4f4");
                    $(".chekcmore_btn").css("background-position","50px");
                    $(".chekcmore_btn").css("background-image","url("+siteUrl + "/wp-content/themes/eico2017/images/moreicon.png)");
                    $(".checkmore").css("margin-left","25px");
                    $(".checkmore").html("查看更多");
                } else {
                    $loader.removeClass('post_loading_loader').addClass('post_no_more_posts');
                    $(".chekcmore_btn").css("background-color","#000000");
                    $(".chekcmore_btn").css("background-image","none");
                    $(".checkmore").css("margin-left","0");
                    $(".checkmore").html("没有更多了");                    
                    $("#more_posts").hide();
                }
                loadflag = 0;
            },
            error : function (jqXHR, textStatus, errorThrown) {
                $loader.html($.parseJSON(jqXHR.responseText) + ' :: ' + textStatus + ' :: ' + errorThrown);
            },
        });
    }
    offset += ppp;
    return false;
}
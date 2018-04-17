$(document).ready(function() {
    $('.banner_container').imagesLoaded()
      .always( function( instance ) {
        console.log('all images loaded');
      })
      .done( function( instance ) {
        console.log('all images successfully loaded');
        for (var i = $(".caseimg").length - 1; i >= 0; i--) {
            $($(".caseimg")[i]).attr("src", $($(".caseimg")[i]).attr("data-src"));
        }
      })
      .fail( function() {
        console.log('all images loaded, at least one is broken');
      })
      .progress( function( instance, image ) {
        // var result = image.isLoaded ? 'loaded' : 'broken';
        // console.log( 'image is ' + result + ' for ' + image.img.src );
      });
    $('.banner').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        arrows: true
    });
    $('.question_container').slick({
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        arrows: false
    });
    $(".banner_container .banner .slick-arrow").css("display", "none");
    $(".banner_container").on("mouseenter", function(){
        // console.log("mouseenter");
        $(".banner_container .banner .slick-arrow").css("display", "inline-block");
    });
    $(".banner_container").on("mouseleave", function(){
        // console.log("mouseleave");
        $(".banner_container .banner .slick-arrow").css("display", "none");
    });
    retinajs();
    // console.log("devicePixelRatio: "+window.devicePixelRatio);
    reorder();
    clearcheck();
    page_resize();
    $(window).resize(page_resize);

    function reorder() {
        var count = 0;
        $($.makeArray($(".case_container").find(".case_small")).reverse()).each(function() {
            if ($(this).nextAll().hasClass("case_big")) {
                $($(".case_container").find(".case_big")[$(".case_container").find(".case_big").length - 1]).after($(this));
                count++;
            }
        });
        if (count == 0) {
            // console.log("宝宝们都很听话");
        } else {
            // console.log("有" + count + "个不听话的宝宝，已经放到正确的位置了");
        }
    }

    function clearcheck() {
        var count = $(".case_container").find(".case_big").length;
        $($(".case_container").find(".case_small")[0]).css("clear", "both");
    }
  
  function page_resize() {
        var width = $(window).width();
        if (width >= 1600) {
            $(".banner_container .banner_title p").css("font-size", "58px");
            $(".banner_container .banner_title p").css("margin-bottom", "0");
            $(".banner_container .banner_logo, .banner_container .banner_clear").css("margin-top", "30px");
        } else if (width < 1600 && width > 768) {            
            $(".banner_container .banner_title p").css("font-size", 38 + 20/600 * (width-1000));
            $(".banner_container .banner_title p").css("margin-bottom", 18/600 * (width-1000));
            $(".banner_container .banner_logo, .banner_container .banner_clear").css("margin-top", 30 + 20/600 * (width-1000));
        } else {
        $(".banner_container .banner_title p").css("font-size", "none");
            $(".banner_container .banner_title p").css("margin-bottom", "none");
            $(".banner_container .banner_logo, .banner_container .banner_clear").css("margin-top", "none");
        }
    }
    
    if ($(".islabel")) {
        for (var i = 0; i < $(".islabel").length; i++) {
            if ($(window).width() > 768) {
                marginleft = parseFloat($($(".islabel")[i]).prev().css("width")) + 45;
            } else {
                marginleft = parseFloat($($(".islabel")[i]).prev().css("width")) + 36;
            }
            $($(".islabel")[i]).css("margin-left", marginleft);
        }
    }

    if ($(".brand_container").length % 3 != 0 && $(".brand_container").length > 3) {
    	// console.log($(".brand_container").length+ "个logo,显示"+ parseInt($(".brand_container").length/3)+"排,隐藏倒数"+$(".brand_container").length%3+"个。");
    	if ($(".brand_container").length%3 == 1) {
    		$($(".brand_container")[$(".brand_container").length-1]).addClass("pc");
    	} else {
    		$($(".brand_container")[$(".brand_container").length-1]).addClass("pc");
    		$($(".brand_container")[$(".brand_container").length-2]).addClass("pc");
    	}
    } else {
    	// console.log($(".brand_container").length+ "个logo,刚好"+$(".brand_container").length/3+"排。");
    }
  
});

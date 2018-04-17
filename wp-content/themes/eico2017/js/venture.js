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
            // console.log("68");
            $(".menu").addClass("scrolled");
            $(".menu").css("background-color", "#ffffff");
            $(".menu .leftmenu li a").css("color", "black");
            $(".menu .rightmenu li a p").css("color", "#8d8d8d");
            // $(".menu .current,.menu .hover ").css("border-bottom", "4px solid #000000");
            // console.log($(".pcmenu_container a img").attr("src"));
            $(".pcmenu_container a img").attr("src", templateUrl+"/images/eico_logo.svg");
        } else {
            $(".menu").removeClass("scrolled");
            $(".menu").css("background-color", "rgba(255,255,255,0)");
            $(".menu .rightmenu li a p").css("color", "#ffffff");
            $(".menu .leftmenu li a").css("color", "white");
            // $(".menu .current,.menu .hover ").css("border-bottom", "4px solid #ffffff");
            $(".pcmenu_container a img").attr("src", templateUrl+"/images/eico_logo_white.svg");
        }
    }
    
    for (var i = 0; i < $(".mobile_timeline p").length; i++) {
        // console.log(i+": "+ $($(".mobile_timeline p")[i]).css("height"));
        if (parseInt($($(".mobile_timeline p")[i]).css("height")) > 26 && $($(".mobile_timeline p")[i]).next()[0]) {
            $($(".mobile_timeline p")[i+1]).before('<div class="upline"></div>');
        }
    }
    for (var i = 0; i < $(".time p").length; i++) {
        if (parseInt($($(".time p")[i]).css("height")) > 26 && $($(".time p")[i]).next()[0]) {
            $($(".time p")[i+1]).before('<div class="upline"></div>');
        }
    }
    var pheight = 0;
    for (var i = 0; i < $(".projects .project p").length; i++) {
    	// console.log(parseInt($($(".projects .project p")[i]).css("height")));
    	if (parseInt($($(".projects .project p")[i]).css("height")) > pheight) {
    		pheight = parseInt($($(".projects .project p")[i]).css("height"));
    	}
    }
    $(".projects .project p").css("min-height", pheight);
});

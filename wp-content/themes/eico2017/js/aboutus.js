$(document).ready(function() {
    $(".photowallbanner").css("height", $(window).width());
    $(".photowallbanner").css("margin-top", parseInt($(".mobile_pagetitle").css("height")) + 2 * parseInt ($(".mobile_pagetitle").css("margin-top")));
    $(".photowallbanner").slick({
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        arrows: false
    });
    $(".chooselabel li").on("click", function() {
        $(".chooselabel li").removeClass("active");
        $(this).addClass("active");
        if ($(this).attr("name") == "join") {
            $(".aboutus").removeClass("show");
            $(".aboutus").addClass("hide");
            $(".joinus").removeClass("hide");
            $(".joinus").addClass("show");
            for (var i = 0; i < $(".col4").length; i++) {
                countlist[i].reset();
                countlist[i].start();
            }
        } else {
            $(".joinus").removeClass("show");
            $(".joinus").addClass("hide");
            $(".aboutus").removeClass("hide");
            $(".aboutus").addClass("show");
        }
    });
    $('.image_container').masonry({
        columnWidth: 210,
        itemSelector: '.img-tile'
    });
    $(".recruit_labelbtn").on("click", function() {
        if (this.value == "全部") {
            $(".position").show();
        } else {
            var current = "." + this.value;
            $(".position").hide();
            $(current).show();
        }
    });
    $(".imglist").hide();
    $(".北京空间").show();
    $(".space_labelbtn").on("click", function() {
        var current = "." + this.value;
        $(".imglist").hide();
        $(current).show();
    });

    $(".space_labelbtn").on("click", function() {
        $(".space_labelbtn").removeClass("labelbtn_active");
        $(this).addClass("labelbtn_active");
    });

}); 

function changephoto(data) {
    var i = Math.floor(Math.random() * 14) + 1;
    var j = Math.floor(Math.random() * data.length);
    $(".image_container div:nth-child("+ i +")").slideUp(300, function(){$(this).remove();});  
    if (i == 1) {
        $(".image_container").prepend('<div class="img-tile img-tile-big" style="background-image: url('+ data[j]+'); position: absolute; left: 0px; top: 0px;"></div>');
    } else if (i == 2) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile img-tile-big" style="background-image: url('+ data[j]+'); position: absolute; left: 210px; top: 0px;"></div>');
    } else if (i == 3) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile" style="background-image: url('+ data[j]+'); position: absolute; left: 630px; top: 0px;"></div>');
    } else if (i == 4) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile" style="background-image: url('+ data[j]+'); position: absolute; left: 840px; top: 0px;"></div>');
    } else if (i == 5) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile" style="background-image: url('+ data[j]+'); position: absolute; left: 1050px; top: 0px;"></div>');
    } else if (i == 6) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile img-tile-big" style="background-image: url('+ data[j]+'); position: absolute; left: 1260px; top: 0px;"></div>');
    } else if (i == 7) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile" style="background-image: url('+ data[j]+'); position: absolute; left: 0px; top: 210px;"></div>');
    } else if (i == 8) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile img-tile-big" style="background-image: url('+ data[j]+'); position: absolute; left: 630px; top: 210px;"></div>');
    } else if (i == 9) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile" style="background-image: url('+ data[j]+'); position: absolute; left: 1050px; top: 210px;"></div>');
    } else if (i == 10) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile" style="background-image: url('+ data[j]+'); position: absolute; left: 0px; top: 420px;"></div>');
    } else if (i == 11) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile" style="background-image: url('+ data[j]+'); position: absolute; left: 210px; top: 420px;"></div>');
    } else if (i == 12) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile" style="background-image: url('+ data[j]+'); position: absolute; left: 420px; top: 420px;"></div>');
    } else if (i == 13) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile" style="background-image: url('+ data[j]+'); position: absolute; left: 1050px; top: 420px;"></div>');
    } else if (i == 14) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile" style="background-image: url('+ data[j]+'); position: absolute; left: 1260px; top: 420px;"></div>');
    } else if (i == 15) {
        $(".image_container div:nth-child("+ i +")").before('<div class="img-tile" style="background-image: url('+ data[j]+'); position: absolute; left: 1470px; top: 420px;"></div>');
    }
    setTimeout(function(){ changephoto(data) },3000);
}
var jsondataflag = 0;
function load_more_photo() {
    $.ajax({
        type: 'POST',
        url: siteUrl + '/wp-admin/admin-ajax.php?action=eico2016_more_photo',
        success: function(data) {
            var jsondata = JSON.parse(data);
            changephoto(jsondata);
        }
    });
}
load_more_photo();

var options = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.',
    prefix: '',
    suffix: ''
};

var countlist = new Array($(".col4").length);

for (var i = 0; i < $(".col4").length; i++) {
    countlist[i] = new countUp("joinusinfo_" + i, 0, parseInt($("#joinusinfo_" + i).html()), 0, rnd(0, 2.5), options);
    countlist[i].start();
}

function rnd(start, end) {
    return Math.random() * (end - start) + start;
}

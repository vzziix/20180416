$(document).ready(function() {

  
  // for (var i = 0; i < $(".pictext_container").find("p").length; i++) {
  //   if ($($(".pictext_container").find("p")[i]).html =="") {
  //     $($(".pictext_container").find("p")[i]).remove();
  //   }
  // }
    $(".col-1").find(".paragraph-block").each(function(index, value){
      var str = $(value).find("p").html();
      // var content = $(value).find("p")[0];
      // content = '<p>' + content.replace(/\n([ \t]*\n)+/g, '</p><p>').replace(/\n/g, '<br />') + '</p>';
      // $(value).find("p")[0] = content;
      $(value).find("p").addClass("replace");
      str = str.replace(/\n/g,"</p><p>");
      $(".replace").html(str);
      $(".replace").removeClass("replace");
    });

    $(".col-2").find(".text-block:first-child").each(function(index, value) {
        $(value).addClass("toleft")
        $(value).next().addClass("toright");
        $(value).next().after($(value));
    });

    $(".labelbtn").on("click", function() {
        window.location.href = "../../product?label=" + this.value;
    });
    
  // 移除空的h4和p
  for (var i = 0; i < $(".paragraph-block h4").length; i++) {
    if ($($(".paragraph-block h4")[i]).html() == "") {
      // console.log(i);
      $($(".paragraph-block h4")[i]).addClass("toremove");
    }
  }

  for (var i = 0; i < $("p").length; i++) {
    if ($($("p")[i]).html() == "") {
      // console.log(i);
      $($("p")[i]).addClass("toremove");
    }
  }
  $(".toremove").remove();

  // 段首空两格
  $(".content").find("h3").prepend("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
  $(".content_full").find("p").prepend("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");

    // $('.pc_case_container').slick({
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     adaptiveHeight: true,
    //     arrows: true,
    //     autoplay: true
    // });
  
    $(".playinfo").on("click",function (){
      var width = $(window).width();
      // if (width < 768) {
         // $(this).hide();
         // $(this).next().hide();
         // $(this).next().next().addClass("playit");
         // document.getElementsByClassName("playit")[0].play();
         // $(this).next().next().removeClass("playit");
      // } else {
        $(".video-dialog-container").css("display","block");
        $(".video_full").attr("src",$(this).next().attr("video-src"));
        $(".video_full").addClass("playit");
         document.getElementsByClassName("playit")[0].play();
      // }
    });
  
    $(".video-mask").on("click", function() {
    	document.getElementsByClassName("playit")[0].pause();
    	$(".video_full").attr("src","");
        $(".video_full").removeClass("playit");
        $(".video-dialog-container").css("display","none");
    });
  
  $(".video-close").on("click", function() {
  		document.getElementsByClassName("playit")[0].pause();
  		$(".video_full").attr("src","");
        $(".video_full").removeClass("playit");
        $(".video-dialog-container").css("display","none");
    });

  if ($(".type").html() == "") {
    $(".type").remove();
    $(".share").css("margin-top", "44px");
  }

  $(".venturelabel").on("click" ,function(){
    window.location = "../../venture";
  });

  $(".video-cover").on("click", function(){
    // console.log("click");
    $(this).prev(".playinfo").trigger("click");
  });
});

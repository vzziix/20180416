$(document).ready(function(){  
  $(".labelbtn").on("click", function(){
    if (this.value == "全部") {
      $(".brand").parent().removeClass("brand_no_width");
      $(".brand").parent().addClass("width_brand");
    } else {
      var current = "." + this.value;
      $(".brand").parent().removeClass("width_brand");
      $(".brand").parent().addClass("brand_no_width");
      $(current).parent().removeClass("brand_no_width");
      $(current).parent().addClass("width_brand");      
    }
  });
});
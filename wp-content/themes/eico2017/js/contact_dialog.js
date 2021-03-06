$(document).ready(function(){  
  $("input").focus(function(){
    $(".selecter").addClass("unselecter");
    $(".selecter").removeClass("selecter");
    $(".list").removeClass("show");
    $(".list").addClass("hide");
    $(".unselecter").css("border","solid 1px #dcdcdc");
    $(this).parent().css("border","solid 1px #008aff");
  }); 
  $("input").blur(function(){
    $(this).parent().css("border","solid 1px #dcdcdc");
  }); 
  $("textarea").focus(function(){
    $(".selecter").addClass("unselecter");
    $(".selecter").removeClass("selecter");
    $(".list").removeClass("show");
    $(".list").addClass("hide");
    $(".unselecter").css("border","solid 1px #dcdcdc");
    $(this).parent().css("border","solid 1px #008aff");
  });
  $("textarea").blur(function(){
    $(this).parent().css("border","solid 1px #dcdcdc");
  }); 
  $("body").on("click", ".unselecter", function(){  
    $(".selecter").addClass("unselecter");
    $(".selecter").removeClass("selecter");
    $(".list").removeClass("show");
    $(".list").addClass("hide");
    $(".unselecter").css("border","solid 1px #dcdcdc");
    $(this).find(".list").removeClass("hide");
    $(this).find(".list").addClass("show");
    $(this).removeClass("unselecter");
    $(this).addClass("selecter");
  });
  $("body").on("click", ".selecter", function(){
    $(".list").removeClass("show");
    $(".list").addClass("hide");
    $(this).find(".list").removeClass("show");
    $(this).find(".list").addClass("hide");
    $(this).addClass("unselecter");
    $(this).removeClass("selecter");
  });
  $("body").on("click", ".list li", function(){
    $(".list").removeClass("show");
    $(".list").addClass("hide");
    $(this).parent().parent().find(".placeholder").html("：" + $(this).html());
    $(this).parent().parent().find("input").val($(this).html());
    $(this).parent().removeClass("show","unselecter");
    $(this).parent().addClass("hide","selecter");
    $(this).parent().parent().css("border","solid 1px #008aff");
  });

$(".btn_submit_dialog").on("click",
      function() {
        var re = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
        if(($( "#forms_field_25").val()) == "" ||($( "#forms_field_26").val()) == "" ||($( "#forms_field_27").val()) == "" || ($( "#forms_field_28").val()) == "" ){
          if (($( "#forms_field_25").val()) == "") {
            $( "#forms_field_25").parent().css("border","solid 1px red");
          }
            if (($( "#forms_field_26").val()) == "") {
              $( "#forms_field_26").parent().css("border","solid 1px red");
            }
              if (($( "#forms_field_27").val()) == "") {
                $( "#forms_field_27").parent().css("border","solid 1px red");
              }
                if (($( "#forms_field_28").val()) == "") {
                  $( "#forms_field_28").parent().css("border","solid 1px red");
                }
        } else if ( !re.test($('#forms_field_27').val()) ) {
          $( "#forms_field_27").parent().css("border","solid 1px red");
      } else {
          var url = siteUrl + "/wp-admin/admin-ajax.php?action=ninja_forms_ajax_submit";
          $(".btn_submit_dialog").html("发送中...");
          $.ajax({
                 type: "POST",
                 url: url,
                 data: $("#ninja_forms_form_10").serialize(),
                 success: function(data) {
                   data = eval("(" + data + ")");
                   if (data.success == true && data.errors == false) {
                     $(".send-dialog-container").css("display", "block");
                   } else {
                   }
                 }
           });  
        }
      }),
      $(".dialog-close").on("click",
      function() {
          $(".send-dialog-container").css("display", "none")
          $('#forms_field_25, #forms_field_26, #forms_field_27, #forms_field_28, #forms_field_29,#forms_field_33').val('');
          $(".placeholder").html("");
          $(".btn_submit_dialog").html("完成并发送");
          $(".contact-close").trigger("click");
    });
});
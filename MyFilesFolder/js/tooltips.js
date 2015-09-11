$(document).ready(function () {
   
    var show;
    $(".tooltips span").hover(function () {
        var $span = $(this).parent().find("div");
        show = setTimeout(function () {
            $span.css("display", "block");
        }, 1500);
    },
    function () {
        clearTimeout(show);
        $(this).parent().find("div").css("display", "none");
    }
    );

    //set click event for support topic span:display support topic tree
    $(".tooltips showsupportTopic").click(function () {
        $("#supportTopicTree").show();
    });
});

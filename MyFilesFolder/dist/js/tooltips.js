$(document).ready(function(){var o;$(".tooltips span").hover(function(){var i=$(this).parent().find("div");o=setTimeout(function(){i.css("display","block")},1500)},function(){clearTimeout(o),$(this).parent().find("div").css("display","none")}),$(".tooltips showsupportTopic").click(function(){$("#supportTopicTree").show()})});
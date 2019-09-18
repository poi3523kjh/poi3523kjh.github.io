function GetInfo() {
	$.ajax({
                type: "GET",
                url:'https://id.dahe.cn/dahe/self/showjs',
                async: true,
				dataType: 'jsonp',
				jsonp: 'jsonpCallback',
				jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                success: function(data) {
				    var success = data.success;
					var msg = data.msg;
					if(success){
					     $("#logined").html('<a href="http://id.dahe.cn/" style="float:right;padding-right:10px;">'+ msg + '</a>');
					}else{
						 
					}
                },
				error: function(request) {
					$("#logined").html('请登录');
                },
});
}
var xiangguan = $('#hl-RelationDiv').html();
var relists = $('#relists').html();
if(!xiangguan){
	loadJs('http://bang.dahe.cn/api/dahe/bwtxrec/bwtxrec.php');
	$(".dTit01>h2").html('推荐阅读');
};
if(!relists){
	loadJs('http://bang.dahe.cn/api/dahe/bwtxrec/bwtxrec.php');
	$(".dTit01>h2").html('推荐阅读');
};
function loadJs(file) {
            var head = $("head").remove("script[role='reload']");
            $("<scri" + "pt>" + "</scr" + "ipt>").attr({ role: 'reload', src: file, type: 'text/javascript' }).appendTo(head);
}
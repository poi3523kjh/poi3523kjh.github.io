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
document.writeln("<script type=\"text/javascript\">");
document.writeln("var _bdhmProtocol = ((\"https:\" == document.location.protocol) ? \" https://\" : \" http://\");");
document.writeln("document.write(unescape(\"%3Cscript src=\'\" + _bdhmProtocol + \"hm.baidu.com/h.js%3F20e58dd242419c5aba8761f5b1a3e40b\' type=\'text/javascript\'%3E%3C/script%3E\"));");
document.writeln("</script>");
document.writeln("<script>");
document.writeln("(function(){");
document.writeln("    var bp = document.createElement(\'script\');");
document.writeln("    bp.src = \'//push.zhanzhang.baidu.com/push.js\';");
document.writeln("    var s = document.getElementsByTagName(\"script\")[0];");
document.writeln("    s.parentNode.insertBefore(bp, s);");
document.writeln("})();");
document.writeln("</script>");
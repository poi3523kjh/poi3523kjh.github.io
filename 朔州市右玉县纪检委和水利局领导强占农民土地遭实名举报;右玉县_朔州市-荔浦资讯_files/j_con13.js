// JavaScript Document

$(function(){
	function slideShow(obj,num_current){
		obj_width = obj.children().css("width");
		//console.log("obj_width:   "+obj_width);
		obj_width_sum = obj.children().size() * parseInt(obj_width);
		//console.log("obj_width_sum:  " + obj_width_sum);
		//num_current = num_current % obj.children().size();		
		//console.log("num_current:  " + num_current);
		pos_left = parseInt(obj_width) * num_current;
		//console.log("pos_left:  " + pos_left);
		move_speed = 300;
		
		if (pos_left >= obj_width_sum){
			pos_left = 0;
			num_current = 0;
			move_speed = 150;
		}
		
		obj.animate(
			{"left":-pos_left},move_speed
		)
		num_current = num_current + 1;
		//console.log("num_current:  "+num_current);
		return num_current;
	}
	
	
	
	
	
	//###############  dz slide  ###############################
	var dz_current = 0;
	$.extend({
		slide_dz:function(){
			//console.log("#######   slide_bang  begin  #####");
			dz_current = slideShow($("#ulDz"),dz_current);
			dzBtnSwitch(dz_current);
			//bangBtnSwitch(bang_current);
		}
	});
	var timer_dz;
	
	
	function dzBtnSwitch(num_current){
		if (num_current == 1){
			left_pos = "0px";
		}else{
			left_pos = "49%";
		}
		$("#switchBtnDz .btnShadow").animate(
			{"left":left_pos},300
		);
	}
	
	
	$("#switchBtnDz").delegate('a','click',function(){
		clearInterval(timer_dz);
		dz_current = $(this).index();
		
		$.slide_dz();
		timer_dz = setTimeout("$.dz_roll()",10000);    //lol
		return false;
	});
	
	
	
	var time_roll;
		
	$.extend({
		dz_roll:function(){
			$.slide_dz();
			//var time_roll;
			if ( dz_current == 1){			
				time_roll = 4000;
			}else{
				time_roll = 10000;
			}
			timer_dz = setTimeout("$.dz_roll()",time_roll);  //lol
		}
	});
	$.dz_roll();
	
	
	$("#ulDz").hover(
		function(){
			clearInterval(timer_dz);
		},
		function(){
			timer_dz = setTimeout("$.dz_roll()",4000);    
		}
	);			//lol
	
	

	$("#dc_4 .dTit05").delegate('h3','click',function(){
		clearInterval(timer_dz);
		//console.log("######### clear #######");	
		return false;
	});
	
	
	//###############  订制新闻向上滚动  ###############
	var dz_scroll_obj_height = parseInt($("#dzNews").children().eq(0).innerHeight());
		
	function dz_news_reset(obj,num){
		obj.css("top",-(dz_scroll_obj_height * (obj.children("li:gt("+num+")").size()-1)));
		obj.prepend(obj.children("li:gt("+num+")").clone());
	}
	
	function dz_news_switch(obj,num_current){
		if (num_current > 6){
			num_current = 0;
		}
		num_current_c = (num_current + 2) % 7 + 1;
		if ( num_current_c == 1 ) {
			obj.css("top","0px");
		}
		
		pos_top = num_current_c * dz_scroll_obj_height;
		//console.log("pos_top   "+pos_top);
		
		obj.animate(
			{"top":-pos_top},200
		);
		
		//console.log("num_current:   "+ num_current+"     c:   "+ num_current_c);
		obj.children("li:eq("+num_current_c+")").next().siblings().removeClass();
		obj.children("li:eq("+num_current_c+")").next().addClass("liCur");
		
		$("#paperLinks").children("div:eq("+num_current+")").siblings().removeClass();
		$("#paperLinks").children("div:eq("+num_current+")").addClass("dConPl");

		num_current = num_current + 1;		
		
		//console.log("top ######  num:      "+num_tmp);
		
		return num_current;
		 
	}	
	
	dz_news_current = 0;
	
	$.extend({
		dz_news_slide:function(){
			dz_news_current = dz_news_switch($("#dzNews"),dz_news_current);
		}
	});
	
	dz_news_reset($("#dzNews"),2);
	$.dz_news_slide();
	var timer_dz_news = setInterval("$.dz_news_slide()",3000);
	
	
	$("#dzNews").hover(
		function(){
			clearInterval(timer_dz_news);
		},
		function(){
			timer_dz_news = setInterval("$.dz_news_slide()",3000);
		}
	);   //lol
	
	/*$("#dc_3 .dTit05").delegate('h3','click',function(){
		clearInterval(timer_dz_news);
		console.log("######### clear #######");	
		return false;
	});*/
	
	
	
	//##################  订制色块切换 ###################
	
	var left_pos;
	var top_pos;
	var width_val;
	var height_val;
	
	
	
	$("#paperLinks").delegate('div','click mouseleave',function(event) {
		if ( (event.type == "click") && ($(this).css("z-index") != "20")){
			 clearInterval(timer_dz_news);
			 left_pos = $(this).css("left");
			 top_pos = $(this).css("top");
			 width_val = $(this).css("width");
			 height_val = $(this).css("height");
			 //$(this).animate({width:'268px',left:'0px'},200).animate({height:'166px',top:'0px'},200);
			 $(this).animate({width:'300px',left:'0px'},200).animate({height:'166px',top:'0px'},200,function(){
				 	$(this).attr("class","dConPl dConPlCur");
					$(this).find("h4").animate({
						height:'30px',
						lineHeight:'30px',
						width:'100%',
						marginTop:'20px'
					},100);
				 });
			 $(this).css("z-index","20");
			 dz_news_current = $(this).index();
			 //console.log("dz_news_current:  "+dz_news_current);
			 $.dz_news_slide();
			 //console.log("dz_news_current:  "+dz_news_current);
		}else if(((event.type == "click") || (event.type == "mouseleave")) && $(this).css("z-index") == "20"  ){
			clearInterval(timer_dz_news);
			timer_dz_news = setInterval("$.dz_news_slide()",3000);
			//console.log(left_pos+"   "+top_pos+"    "+width_val+"    "+height_val);
			//console.log("timer_dz_news:  "+timer_dz_news);
			//$(this).animate({left:left_pos,width:width_val},200).animate({top:top_pos,height:height_val},200);
			$(this).animate({left:left_pos,width:width_val},200).animate({top:top_pos,height:height_val},200,function(){
					$(this).css("z-index","0");
					$(this).attr("class","dConPl");
					$(this).find("h4").animate({
						height:height_val,
						lineHeight:height_val,
						marginTop:'0px'
					},200);
				});
			//console.log("event.type:   "+event.type);
		}
	});
	
	
	
	//#################  排行榜  ################
	
	var rank_current = 0;
	$.extend({
		slide_rank:function(){
			$("#siteRankSwitchBtn a:eq("+rank_current+")").siblings().removeClass();
			$("#siteRankSwitchBtn a:eq("+rank_current+")").addClass("aCur");

			rank_current = slideShow($("#siteRankClip .ulSiteRank"),rank_current);
		}
	})
	
	$("#siteRankSwitchBtn").delegate('a','click',function(){
		rank_current = $(this).index();
		$.slide_rank();
		$(this).blur();
		return false;
	});
	
	//##################### focus area  ##################
	
	function focusArea_switch(obj,num_current){
		obj_height = parseInt(obj.children().eq(0).innerHeight());	
		if ( num_current > 2 ){
			num_current = 0;
		}
		pos_top = num_current * obj_height;
		obj.animate(
			{"top":-pos_top},200
		);
		//num_tmp = num_current - 1;
		$("#focusAreaBtns li:eq("+num_current+")").siblings().removeClass();
		$("#focusAreaBtns li:eq("+num_current+")").addClass("liCur");
		num_current = num_current + 1;
		return num_current;
		
	};
	
	
	var focusArea_current = 0;
	$.extend({
		slide_focusArea:function(){
			//$("#siteRankSwitchBtn a:eq("+rank_current+")").siblings().removeClass();
			//$("#siteRankSwitchBtn a:eq("+rank_current+")").addClass("aCur");

			focusArea_current = focusArea_switch($("#focusAreaCon"),focusArea_current);
			
		}
	})
	$.slide_focusArea();
	var timer_focusArea = setInterval("$.slide_focusArea()",3000);
	
	$("#focusAreaBtns").delegate('li','click',function(){
		clearTimeout(timer_focusArea);
		focusArea_current = $(this).index();
		$.slide_focusArea();
		timer_focusArea = setInterval("$.slide_focusArea()",3000);
		return false;
	});
	
	$("#ad01").delegate('img','click',function(){
		clearTimeout(timer_focusArea);
		console.log("##########  clear  ##############");
	});
	
});


$(function(){							// 页内组图
	imgUrlArr = new Array();
	imgUrlThumbArr = new Array();
	imgTitArr = new Array();
	imgDescArr = new Array();
	imgWidthArr = new Array();
	imgHeightArr = new Array();
	var thumbImgWidth = 105;
	var thumbImgHeight = 70;
	
	
	function picDataRead(obj){				//数据读取
		var i = 0;
		ulThumb ="<ul class='clearfix'>";
		obj.find("li").each(function(i){
			imgUrlArr[i] = obj.find("img:eq("+i+")").attr("src");
			imgUrlThumbArr[i] = urlChg(imgUrlArr[i],thumbImgWidth,thumbImgHeight);
			imgTitArr[i] = obj.find("img:eq("+i+")").attr("alt");
			imgDescArr[i] = obj.find("span:eq("+i+")").text();
			ulThumb = ulThumb + "<li><a href='#'  hideFocus='true'><img src='"+imgUrlThumbArr[i]+"'></a></li>";
		});
		ulThumb = ulThumb + "</ul>";
		$("#picThumbClip").html(ulThumb);
	}
	
	function urlChg(str,w,h){
		var n = str.lastIndexOf(".");
		var imgThumbName = "_"+w+"_"+h;
		str = str.substring(0,n) + imgThumbName + str.substring(n);
		return str;
	}	
	//picDataRead($("#picData"));
	
	if ($("#picData li").length) {
		var text1 = '<div id="mainPicGrp"><div id="mainPicClip"><i><img id="img1" src=""></i><div class="pic_prev"><a href="#" hideFocus="true"></a></div><div class="pic_next"><a href="#" hideFocus="true"></a></div></div><div id="mainPicIntro"><em>(<strong></strong>/)</em><span></span></div><div id="picThumb"><a href="#" class="aPrev" hideFocus="true" id="thumb_btn_prev"></a><div id="picThumbClip"><ul class="clearfix"></ul></div><a href="#" class="aNext" hideFocus="true" id="thumb_btn_next"></a><div class="clear"></div></div></div>';
		//$("#mainCon").prepend(text1);
		$("#mainCon").before(text1);
		picDataRead($("#picData"));
	
	
	
		var num_pic_current = 0;
		var num_pic = 0;
		var pos_step = 0;
		var obj_thumb = $("#picThumbClip");
		var thumb_clip_width = obj_thumb.innerWidth();
		var thumb_width = parseInt(obj_thumb.find("li:eq(0)").outerWidth()) + parseInt(obj_thumb.find("li:eq(0)").css("margin-left"));
		var thumb_num = parseInt(thumb_clip_width / thumb_width);
		var thumb_all_width = 0;
		 
		obj_thumb.find("li").each(function(i){
			thumb_all_width = thumb_all_width + parseInt($(this).outerWidth()) + parseInt($(this).css("margin-left"));
			num_pic = i + 1;
		});	
		obj_thumb.find("ul").css("width",thumb_all_width);
	
	
		picSwitch(num_pic_current);
	}
	
	function picSwitch(num){						//预览图切换 缩略切换 摘要切换
		$("#mainPicClip img").fadeOut(100,function(){
				$(this).attr("src",imgUrlArr[num]);
				$(this).fadeIn(200);
				getImg(num);
			});
			
		$("#picThumbClip li:eq("+num+")").siblings().removeClass();
		$("#picThumbClip li:eq("+num+")").addClass("liCur");
		$("#mainPicIntro").html("<em>(<strong>" + (num_pic_current+1) + "</strong>/" + num_pic +")</em><span>" + imgDescArr[num_pic_current] +"</span>");
		picThumbSwitch(num);
	}
	
		
	function picThumbSwitch(num_pic_current){     //缩略图移动
		var obj = obj_thumb;
		var pos_left;
		if (num_pic_current > num_pic){
			num_pic_current = 0
		}
		var pos_step_tmp = parseInt(num_pic_current * thumb_width / thumb_clip_width );
		
		
		if(num_pic_current <= (thumb_num - 1)){
			$("#picThumb").children("a").first().attr("class","aPrev");
		}else{
			$("#picThumb").children("a").first().attr("class","aPrev aP1");
		}

		if(((pos_step_tmp + 1) * thumb_num) > (num_pic - 1)){
			$("#picThumb").children("a").last().attr("class","aNext");
		}else{
			$("#picThumb").children("a").last().attr("class","aNext aN1");
		}
		
		if(thumb_all_width <= thumb_clip_width){
			$("#picThumb").children("a").first().css("background-position-x","0px");
			$("#picThumb").children("a").last().css("background-position-x","-52px");
		}
		
		if (pos_step_tmp != pos_step){
			pos_step = pos_step_tmp;
			pos_left = pos_step * thumb_clip_width;
			obj.children("ul:eq(0)").animate(
				{"left":-pos_left},300
			);
		}
	}
	
	
	$("#mainPicClip").delegate("a","click",function(){			//点击预览图切换
		//console.time('preiview');
		if ($(this).parent().attr("class") == "pic_next"){
			num_pic_current = num_pic_current + 1;
			if (num_pic_current >= num_pic) {
				num_pic_current = 0;
			}
		}else{
			num_pic_current = num_pic_current - 1;
			if (num_pic_current < 0) {
				num_pic_current = num_pic - 1;
			}
		}
		//console.log("num:   "+ num_pic_current);
		picSwitch(num_pic_current);
		//console.timeEnd('preiview');
		return false;
	});
	
	$("#picThumbClip ul").delegate('li','click',function(){         //点击缩略图切换
		//console.time("thumb");
		if ( num_pic_current != $(this).index()) {
			num_pic_current = $(this).index();
			picSwitch(num_pic_current);
		}
		
		//console.timeEnd("thumb");
		return false;
	});
	
	
	$("#picThumb").delegate('a.aPrev,a.aNext','click',function(){			//缩略图左右点击移动
		//console.time("thumb move");
		
		if ($(this).attr("id") == "thumb_btn_next"){
			
			if ((( parseInt(num_pic_current / 5) + 1 ) * 5) > (num_pic-1)){
				return false;
			}
			num_pic_current = ( parseInt(num_pic_current / 5) + 1 ) * 5;
		}else if ($(this).attr("id") == "thumb_btn_prev"){
			if ((( parseInt(num_pic_current / 5) - 1 ) * 5) < 0){
				return false;
			}
			num_pic_current = ( parseInt(num_pic_current / 5) - 1 ) * 5;
		}
		picSwitch(num_pic_current);		
		
		//console.timeEnd("thumb move");
		return false;
	});
	
	
	
	
	function getImg(num){
		//console.log($("#mainPicClip img").innerWidth() + "      " + $("#mainPicClip img").innerHeight());
		var img = $("#img1");  
		var img = new Image();
		img.src = imgUrlArr[num];
		 
		if(img.complete){
			imgResize.call(img);
			img = null;
		}else{
			img.onload=function(){
				imgResize.call(img);
				img = null;
			};
		}
	}
	
	function imgResize(){
		var w_s = 618;
		var h_s = 412;
		var w = this.width ;
		var h = this.height;
		var ratio = w / h; 
		var ratio_s = w_s / h_s;
		
		if ( this.width > w_s || this.height > h_s ){
			if ((w / h) > ratio_s){
				h = 1 / ratio * w_s;
				w = w_s;
			}else{
				w = ratio * h_s;
				h = h_s;
			}
		}
		$("#mainPicClip img").innerWidth(w);
		$("#mainPicClip img").innerHeight(h);
		//alert(w+"       "+h);
		//alert("lol");
	}
	
	

	
	
});


//document.getElementById("SOHUCS").style.display="none";
//document.getElementById("comments").style.display="none";



$(function(){
	if($("#main #comments").length > 0){
		$("#main #comments").css("display","none");
	}
	
});
	

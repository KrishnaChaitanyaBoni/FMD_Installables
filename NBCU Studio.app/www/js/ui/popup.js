jQuery.noConflict()
$(document).ready(function()
{	

	$('.backlotListcover .ipn, .backlotListcover li .tmIcon, div-thumb a').click(function() { // --for iPhone POPUP
		var popup=$(this).attr('rel');
		
		var w = $("#pop").width(),
			h = $("#pop").height(),
			t = h/2,
			l = w/2 + 10;
			
		$("#pop").css('margin','-'+t+'px 0 0 -'+l+'px');
		$("#pop .ourImg").attr("src",""+popup+"");
		$("#pop .ourImg").css("left","0").css("top","0");
		$("#pop").fadeIn(300);
		
		$('body').append('<div id="mask"></div>');
		$('#mask').fadeIn(300);
		$("#pop .ourImg").css("width","275px").css("height","260px");
		
		return false;
	});
	$('a.close').click(function() {
		$('#mask,#pop').fadeOut(300,function() {
			$('#mask').remove();
			return false;	
		});
		
	});


});
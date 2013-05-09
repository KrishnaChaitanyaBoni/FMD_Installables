$(document).ready(function()
{	

	$('.stageListcover ul li .stagePOP').click(function() { // --for iPhone POPUP
		var popup=$(this).attr('rel');
		
		var w = $("#pop").width(),
			h = $("#pop").height(),
			t = h/2,
			l = w/2 + 10;
			
		$("#pop").css('margin','-'+t+'px 0 0 -'+l+'px');
		$("#pop img").attr("src",""+popup+"");
		$("#pop div#cont").html($(popup).html());
		$("#pop").fadeIn(300);
		
		$('body').append('<div id="mask"></div>');
		$('#mask').fadeIn(300);
		return false;
	});
	$('a.close').click(function() {
		$('#mask,#pop').fadeOut(300,function() {
			$('#mask').remove();
			return false;	
		});
		
	});


});
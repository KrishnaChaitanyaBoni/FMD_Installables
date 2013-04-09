// JavaScript Document

$(document).ready(function(){

$(window).bind('orientationchange', function () {
$(".moreTooltip").css("display","none");
});
    var dirHome = localStorage.getItem("CurPage");
    
    if(dirHome=="universalLanding.html"){
        $(".dirNav ul li:first-child a").removeClass("dirBtnGrnt_grey").addClass("dirBtnGrnt_blue");
        $(".dirNav ul li:nth-child(2) a , .dirNav ul li:last-child a").addClass("dirBtnGrnt_grey").removeClass("dirBtnGrnt_blue");
        $(".UniCA").show();
        $(".NBCchicago, .NBCnewyork, #dirSearchResults").hide();
        $(".dirNav ul li:nth-child(2) a").css("border-left","0px solid #BEBEBE");
        $(".dirNav ul li:nth-child(2) a").css("border-right","1px solid #BEBEBE");
    }
    
    else if(dirHome=="chicagoLanding.html"){
        $(".dirNav ul li:nth-child(2) a").removeClass("dirBtnGrnt_grey").addClass("dirBtnGrnt_blue");
        $(".dirNav ul li:first-child a ,.dirNav ul li:last-child a").addClass("dirBtnGrnt_grey").removeClass("dirBtnGrnt_blue");
        $(".NBCchicago").show();
        $(".UniCA, .NBCnewyork, #dirSearchResults").hide();
        $(".dirNav ul li:nth-child(2) a").css("border-left","0px solid #BEBEBE").css("border-right","0px solid #BEBEBE");
        
    }
    else{
        $(".dirNav ul li:last-child a").removeClass("dirBtnGrnt_grey").addClass("dirBtnGrnt_blue");
        $(".dirNav ul li:first-child a ,.dirNav ul li:nth-child(2) a").addClass("dirBtnGrnt_grey").removeClass("dirBtnGrnt_blue");
        $(".NBCnewyork").show();
        $(".UniCA, .NBCchicago, #dirSearchResults").hide();
        $(".dirNav ul li:nth-child(2) a").css("border-right","0px solid #BEBEBE");
        $(".dirNav ul li:nth-child(2) a").css("border-left","1px solid #BEBEBE");
    }
    
	//Universal Studios directory page display
    $(".dirNav ul li:first-child a").click(function(){
        $(this).removeClass("dirBtnGrnt_grey").addClass("dirBtnGrnt_blue");
        $(".dirNav ul li:nth-child(2) a , .dirNav ul li:last-child a").addClass("dirBtnGrnt_grey").removeClass("dirBtnGrnt_blue");
        $(".UniCA").show();
        $(".NBCchicago, .NBCnewyork, #dirSearchResults").hide();
        $(".dirNav ul li:nth-child(2) a").css("border-left","0px solid #BEBEBE");
        $(".dirNav ul li:nth-child(2) a").css("border-right","1px solid #BEBEBE");
    });
    //NBC Chicago directory page display
    $(".dirNav ul li:nth-child(2) a").click(function(){
        $(this).removeClass("dirBtnGrnt_grey").addClass("dirBtnGrnt_blue");
        $(".dirNav ul li:first-child a ,.dirNav ul li:last-child a").addClass("dirBtnGrnt_grey").removeClass("dirBtnGrnt_blue");
        $(".NBCchicago").show();
        $(".UniCA, .NBCnewyork, #dirSearchResults").hide();
        $(".dirNav ul li:nth-child(2) a").css("border-left","0px solid #BEBEBE").css("border-right","0px solid #BEBEBE");
        
    });
    //NBC NewYork directory page display
    $(".dirNav ul li:last-child a").click(function(){
        $(this).removeClass("dirBtnGrnt_grey").addClass("dirBtnGrnt_blue");
        $(".dirNav ul li:first-child a ,.dirNav ul li:nth-child(2) a").addClass("dirBtnGrnt_grey").removeClass("dirBtnGrnt_blue");
        $(".NBCnewyork").show();
        $(".UniCA, .NBCchicago, #dirSearchResults").hide();
        $(".dirNav ul li:nth-child(2) a").css("border-right","0px solid #BEBEBE");
        $(".dirNav ul li:nth-child(2) a").css("border-left","1px solid #BEBEBE");
        
    });
    
    //Before you get here
    
	//Insurance
    $(".driveNav ul li:first-child a").click(function(){
        $(this).removeClass("dirBtnGrnt_grey").addClass("driveBtnGrnt_green");
        $(".driveNav ul li:last-child a").addClass("dirBtnGrnt_grey").removeClass("driveBtnGrnt_green");
        $(".insurance").show();
        $(".driveonlot").hide();
    });
    
    //Work on the lot
    $(".driveNav ul li:last-child a").click(function(){
        $(this).removeClass("dirBtnGrnt_grey").addClass("driveBtnGrnt_green");
        $(".driveNav ul li:first-child a").addClass("dirBtnGrnt_grey").removeClass("driveBtnGrnt_green");
        $(".driveonlot").show();
        $(".insurance").hide();	
        
    });
    
    //Before you get here end
    
    $("footer nav .facilityHome a").click(function(){
        $(this).parent().addClass("footerselectGradient");	
        hightlightremove();
        $(this).addClass("facilityHomeHover");
		
        $(".moreTooltip,.sendTooltip").css("display","none");
        $("footer .share, footer .directory, footer .map,footer .drive,footer .aboutus,footer .privacy,footer .website, footer .idea, footer .more").removeClass("footerselectGradient");
    });
    $("footer nav .facilityHome a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    
    $("footer nav .directory a").click(function(){
        hightlightremove();
        $(this).parent().addClass("footerselectGradient");	
        $(this).addClass("directoryHover");
        $(".moreTooltip,.sendTooltip").css("display","none");
        $("footer .facilityHome,footer .share, footer .map, footer .drive,footer .aboutus,footer .privacy,footer .website, footer .idea, footer .more").removeClass("footerselectGradient");
        hightlightremove();
    });
    $("footer nav .directory a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    
    
    $("footer nav .map a").click(function(){
        $(this).parent().addClass("footerselectGradient");	
        hightlightremove();
        $(this).addClass("mapHover");
        $(".moreTooltip,.sendTooltip").css("display","none");
        $("footer .facilityHome,footer .share, footer .directory, footer .drive,footer .aboutus,footer .privacy,footer .website, footer .idea, footer .more").removeClass("footerselectGradient");
    });
    $("footer nav .map a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    $("footer nav .idea a").click(function(){
        $(this).parent().addClass("footerselectGradient");	
        $(this).addClass("ideaHover");
        setTimeout(function() {hightlightremove();}, 300);
        $(".moreTooltip,.sendTooltip").css("display","none");
        $("footer .facilityHome,footer .share, footer .directory, footer .map,footer .aboutus,footer .privacy, footer .idea,footer .drive, footer .more, footer .popSMS, footer .popMail,footer .popAboutus,footer .popPrivacy,footer .popWebsite,footer .popidea,footer .popDrive").removeClass("footerselectGradient");
    });
    $("footer nav .idea a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    
    $("footer nav .drive a").click(function(){
        $(this).parent().addClass("footerselectGradient");	
        $(this).addClass("driveHover");
        setTimeout(function() {hightlightremove(); 
            $("footer .facilityHome,footer .share, footer .directory, footer .map,footer .aboutus,footer .privacy, footer .idea, footer .drive, footer .more, footer .popSMS, footer .popMail,footer .popAboutus,footer .popPrivacy,footer .popWebsite,footer .popidea,footer .popDrive").removeClass("footerselectGradient");
            
        }, 300);
        $(".moreTooltip,.sendTooltip").css("display","none");
        
    });
    $("footer nav .drive a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    $("footer nav .share a").click(function(){
        $(".moreTooltip").css("display","none");
        hightlightremove();
        $(this).addClass("shareHover");
        $("footer .facilityHome,footer .more, footer .directory, footer .map,footer .trivia,footer .aboutus,footer .privacy,footer .website, footer .idea,footer .drive").removeClass("footerselectGradient");
        if ($(".sendTooltip").is(":visible") == false)	
        {
            setTimeout(function()
            {
                $(".sendTooltip").show()
                
            }, 300);
            $(this).parent().addClass("footerselectGradient");
        }
        else if ($(".sendTooltip").is(":visible") == true)
        {	
            $(".sendTooltip").hide();
            $(this).parent().removeClass("footerselectGradient");
            $(this).removeClass("shareHover");
        }
    });
    $("footer nav .share a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    $("footer .popSMS a").click(function(){
        
        $(this).addClass("popSMSHover");
        setTimeout(function() {
            hightlightremove();
            $(".moreTooltip,.sendTooltip").hide();
            $("footer .facilityHome,footer .share, footer .directory, footer .map,footer .aboutus,footer .privacy, footer .idea,footer .drive, footer .more, footer .popSMS, footer .popMail,footer .popAboutus,footer .popPrivacy,footer .popWebsite,footer .popidea,footer .popDrive").removeClass("footerselectGradient");
        }, 200);	
        $(".moreTooltip,.sendTooltip").css("display","none");	
    });
    $("footer .popSMS a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    $("footer .popMail a").click(function(){
        
        $(this).addClass("popMailHover");
        setTimeout(function() {
            hightlightremove();
            $(".moreTooltip,.sendTooltip").hide();
            $("footer .facilityHome,footer .share, footer .directory, footer .map,footer .aboutus,footer .privacy, footer .idea, footer .drive, footer .more, footer .popSMS, footer .popMail,footer .popAboutus,footer .popPrivacy,footer .popWebsite,footer .popidea,footer .popDrive").removeClass("footerselectGradient");
        }, 200);	
		
    });
    $("footer .popMail a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    $("footer nav .more a").click(function(){
        
        $(".sendTooltip").css("display","none");
        hightlightremove();
        $(this).addClass("moreHover");
        $("footer .facilityHome,footer .share, footer .directory, footer .map,footer .trivia,footer .aboutus,footer .privacy,footer .website, footer .idea,footer .drive").removeClass("footerselectGradient");
        if ($(".moreTooltip").is(":visible") == false)	
        {
            $(".moreTooltip").css("display","block");
            $(this).parent().addClass("footerselectGradient");
        }
        else if ($(".moreTooltip").is(":visible") == true)
        {
            $(".moreTooltip").css("display","none");
            $(this).parent().removeClass("footerselectGradient");
        }
    });
    $("footer nav .more a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    $("footer .popidea a").click(function(){
        
        $(this).addClass("popideaHover");
        setTimeout(function() {
            hightlightremove();
            $(".moreTooltip,.sendTooltip").hide();
            $("footer .facilityHome,footer .share, footer .directory, footer .map,footer .aboutus,footer .privacy, footer .idea, footer .drive,footer .more, footer .popSMS, footer .popMail,footer .popAboutus,footer .popPrivacy,footer .popWebsite,footer .popidea,footer .popDrive").removeClass("footerselectGradient");
        }, 200);	
		
    });
    $("footer .popidea a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    $("footer .popDrive a").click(function(){
        
        $(this).addClass("popDriveHover");
        setTimeout(function() {
            hightlightremove();
            $(".moreTooltip,.sendTooltip").hide();
            $("footer .facilityHome,footer .share, footer .directory, footer .map,footer .aboutus,footer .privacy, footer .idea, footer .drive, footer .more, footer .popSMS, footer .popMail,footer .popAboutus,footer .popPrivacy,footer .popWebsite,footer .popidea, footer .popDrive").removeClass("footerselectGradient");
        }, 200);	
		
    });
    $("footer .popDrive a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    $("footer .popWebsite a").click(function(){
        
        $(this).addClass("popWebsiteHover");
        setTimeout(function() {
            hightlightremove();
            $(".moreTooltip,.sendTooltip").hide();
            $("footer .facilityHome,footer .share, footer .directory, footer .map,footer .aboutus,footer .privacy, footer .idea,footer .drive, footer .more, footer .popSMS, footer .popMail,footer .popAboutus,footer .popPrivacy,footer .popWebsite,footer .popideafooter .popDrive").removeClass("footerselectGradient");
        }, 200);	
		
    });
    $("footer .popWebsite a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    $("footer .popPrivacy a").click(function(){
        
        $(this).addClass("popPrivacyHover");
        setTimeout(function() {
            hightlightremove();
            $(".moreTooltip,.sendTooltip").hide();
            $("footer .facilityHome,footer .share, footer .directory, footer .map,footer .aboutus,footer .privacy, footer .idea,footer .drive, footer .more, footer .popSMS, footer .popMail,footer .popAboutus,footer .popPrivacy,footer .popWebsite,footer .popidea,footer .popDrive").removeClass("footerselectGradient");
        }, 200);	
		
    });
    $("footer .popPrivacy a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    $("footer .popAboutus a").click(function(){
        
        $(this).addClass("popAboutusHover");
        setTimeout(function() {
            hightlightremove();
            $(".moreTooltip,.sendTooltip").hide();
            $("footer .facilityHome,footer .share, footer .directory, footer .map,footer .aboutus,footer .privacy, footer .idea,footer .drive, footer .more, footer .popSMS, footer .popMail,footer .popAboutus,footer .popPrivacy,footer .popWebsite,footer .popidea,footer .popDrive").removeClass("footerselectGradient");
        }, 200);	
		
    });
    $("footer .popAboutus a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    
    $("footer nav .aboutus a").click(function(){
        $(this).parent().addClass("footerselectGradient");	
        hightlightremove();
        $(this).addClass("aboutusHover");
        $(".moreTooltip,.sendTooltip").css("display","none");
        $("footer .facilityHome,footer .share, footer .directory, footer .map,footer .trivia,footer .privacy,footer .website,footer .idea,footer .drive,footer .more").removeClass("footerselectGradient");
        
    });
    $("footer nav .aboutus a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    $("footer nav .privacy a").click(function(){
        $(this).parent().addClass("footerselectGradient");		
        $(this).addClass("privacyHover");
        setTimeout(function() {hightlightremove();
            $(".moreTooltip,.sendTooltip").css("display","none");
            $("footer .facilityHome,footer .share, footer .directory, footer .map,footer .aboutus,footer .privacy, footer .website,footer .idea,footer .drive, footer .more, footer .popSMS, footer .popMail,footer .popAboutus,footer .popPrivacy,footer .popWebsite,footer .popidea,footer .popDrive").removeClass("footerselectGradient");
        }, 200);
    });
    $("footer nav .privacy a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
    $("footer nav .website a").click(function(){
        $(this).parent().addClass("footerselectGradient");	
        $(this).addClass("websiteHover");
        setTimeout(function() {hightlightremove();
            $(".moreTooltip,.sendTooltip").css("display","none");
            $("footer .facilityHome,footer .share, footer .directory, footer .map,footer .aboutus,footer .privacy, footer .website,footer .idea,footer .drive, footer .more, footer .popSMS, footer .popMail,footer .popAboutus,footer .popPrivacy,footer .popWebsite,footer .popidea,footer .popDrive").removeClass("footerselectGradient");
        }, 200);
    });
    $("footer nav .website a").bind('touchstart', function(){
        $(this).parent().addClass("footerselectGradient");	
        setTimeout(function () {$(this).parent().removeClass("footerselectGradient")},250);
    });
    
    
                  $("#wrapper,header, .mapcategoryLabelselect").click(function(){
                                                                      $(".selectSliderCover .selectSlider").animate({bottom:"-340px"});
                                                                      $(".mapcategoryLabelselect").addClass("mapUpArrowSelect");
                                                                      $(".mapcategoryLabelselect").removeClass("mapDownArrowSelect");
        $("footer .facilityHome, footer .share, footer .directory, footer .map,footer .trivia,footer .aboutus,footer .privacy,footer .website,footer .idea, footer .drive,footer .more").removeClass("footerselectGradient");
        $(".moreTooltip, .sendTooltip").css("display","none");
        $("footer nav .share a").removeClass("shareHover");
        $("footer nav .more a").removeClass("moreHover");
    });
    
    $("header .searchCover").hide();
    $("header .dirSearchclk").click(function(){
      if($(".homeNav").is(":visible")==true){
         $(".homeNav").hide();
       }
        if ($("header .searchCover").is(":visible") == false)	
        {
            $("header .searchCover").show();
            $("header .headings").hide();
        }
       
		
    });
    $(".labelDropDown").hide();
    $(".labelArrowlist").click(function(){
        
        if ($(".labelDropDown").is(":visible") == false)
        {
            $(".labelArrowlist").addClass("labelArrowimghover");
            $(".labelArrowlist").removeClass("labelArrowimg");
            $(".labelDropDown").show();
        }
        else if($(".labelDropDown").is(":visible") == true)
        {
            $(".labelArrowlist").addClass("labelArrowimg");
            $(".labelArrowlist").removeClass("labelArrowimghover");
            $(".labelDropDown").hide();
        }
        
    });
                  $(".selectSlider .listName").click(function(){
                                                     $(this).addClass("listHighlight");
                                                     setTimeout(function() {
                                                                $(this).removeClass("listHighlight");
                                                                }, 50);
                                                     });
                  $(".headerIcon").click(function(){
                                         if ($(".homeNav").is(":visible") == false)
                                         {
                                         $(".homeNav").show();
                                         }
                                         else
                                         {
                                         $(".homeNav").hide();
                                         }
                                         
                                         });
                  $("#wrapper, footer").click(function(){
                                              $(".homeNav").hide();
                                              });
                  $(".homeNavUniversal").bind('touchstart click', function(){ 
                                              $(".homeNavUniversal").addClass("homeNavUniversalroll");
                                              setTimeout(function() {
                                                         $(".homeNavUniversal").removeClass("homeNavUniversalroll");
                                                         $(".homeNav").hide();
                                                         if (platform.iphone) {
                                                         window.location="../html/universalLanding.html";
                                                         }
                                                         else{
                                                         window.open("../html/universalLanding.html");
                                                         }
                                                         }, 200);
                                              });
                  
                  $(".homeNavChicago").bind('touchstart', function(){
                                            
                                            $(".homeNavChicago").addClass("homeNavChicagoroll");
                                            setTimeout(function() {
                                                       $(".homeNavChicago").removeClass("homeNavChicagoroll");
                                                       $(".homeNav").hide();
                                                       if (platform.iphone) {
                                                       window.location="../html/chicagoLanding.html";
                                                       }
                                                       else{
                                                       window.open("../html/chicagoLanding.html");
                                                       }
                                                       }, 200);
                                            });
                  $(".homeNavNewyork").bind('touchstart click', function(){ 
                                            $(".homeNavNewyork").addClass("homeNavNewyorkroll");
                                            setTimeout(function() {
                                                       $(".homeNavNewyork").removeClass("homeNavNewyorkroll");
                                                       $(".homeNav").hide();
                                                       if (platform.iphone) {
                                                       window.location="../html/newyorkLanding.html";
                                                       }
                                                       else{
                                                       window.open("../html/newyorkLanding.html");
                                                       }
                                                       }, 200);
                                            });
                  
                  
                  });

function hideNavPopUp(){
    if($(".homeNav").is(":visible")==true){
        $(".homeNav").hide();
    }
};

$(function(){
  
    $('#scrollDiv,#scrollDiv1,#scrollDiv2,#scrollDiv3,#scrollDiv4').slimscroll();
});

function hightlightremove()
{
    $("footer nav .facilityHome a").removeClass("facilityHomeHover");
    $("footer nav .directory a").removeClass("directoryHover");
    $("footer nav .map a").removeClass("mapHover");
    $("footer nav .idea a").removeClass("ideaHover");
    $("footer nav .drive a").removeClass("driveHover");
    $("footer nav .share a").removeClass("shareHover");
    $("footer nav .more a").removeClass("moreHover");
    $("footer nav .aboutus a").removeClass("aboutusHover");
    $("footer nav .privacy a").removeClass("privacyHover");
    $("footer nav .website a").removeClass("websiteHover");
    $("footer .popSMS a").removeClass("popSMSHover");
    $("footer .popMail a").removeClass("popMailHover");
    $("footer .popidea a").removeClass("popideaHover");
    $("footer .popDrive a").removeClass("popDriveHover");
    $("footer .popWebsite a").removeClass("popWebsiteHover");
    $("footer .popPrivacy a").removeClass("popPrivacyHover");
    $("footer .popAboutus a").removeClass("popAboutusHover");
}







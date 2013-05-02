var sorceService,destService;
var ua = navigator.userAgent;
var destServiceName;
var connectionAvailable=true;
var platform = {
iphone: ua.match(/(iPhone|iPod|iPad)/),
android: ua.match(/Android/)
};



var mailSubject="Snapshot from NBCU Studio Mobile App";
var mailBody ='NBCU Studio app is available for free download from '+ '<a href='+ITUNES_URL+'>App Store</a>'+ ' & ' +'<a href='+GOOGLE_PLAY_URL+'>Play Store</a>';
var toEMail = "";

function aboutUsFooter(){
	
	if (platform.iphone) {
		document.write('<footer class="bottomGradient"><nav style="position:relative;"><div class="facilityHome"><a  onclick="getCurrentLandingPage()">Facility Home</a></div><div class="share" onclick="captureScreenshot();"><a>Send</a></div><div class="directory"><a onclick="loadDirectory();">Directory</a></div><div class="map" onclick="openMap();"><a >Map</a></div><div class="aboutus"><a href="aboutus.html">About Us</a></div><div class="privacy"><a  onClick="showPolicy()">Privacy Policy</a></div><div class="website"><a onclick="loadURL();">Website</a></div><div class="drive" onclick="openLot();"><a href ="#">Before you<br>get here</a></div><div class="idea"><a href ="mailto: studio.operations2@nbcuni.com">Have an idea?</a></div><div class="more" ><a>More</a></div><section class="moreTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="Tooltipicon popidea"><a href ="mailto: studio.operations2@nbcuni.com"><br>Have an idea?</a></section><section class="Tooltipicon popDrive" onclick="openLot();"><a href ="#"><br>Before you<br>get here</a></section><section class="Tooltipicontop popWebsite" ><a onclick="loadURL();"><br>Website</a></section><section class="Tooltipicontop popPrivacy" ><a  onClick="showPolicy()"><br>Privacy Policy</a></section><section class="Tooltipicon popAboutus"><a href="aboutus.html"><br>About Us</a></section></section><section class="dwnssArrrow"></section></section></section><section class="sendTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="sendtipicon popSMS" onclick="sendSMS();"><a ><br>SMS</a></section><section class="sendtipicon popMail" onclick="takeScreenShot(mailSubject,mailBody,true,toEMail);"><a ><br>Email</a></section></section><section class="dwnssArrrow"></section></section></section></nav></footer>')
	}
	else  {
		 var smsTxt="Universal Studios General Contact , Email:studio.operations@nbcuni.com ,  Phone: 1.800.892.1979 %0A Chicago General Contact , Email:trisha.hockings@nbcuni.com ,  Phone: 1.312.836.5800 %0A New York General Contact , Email:marybeth.scalici@nbcuni.com ,  Phone: 1.212.664.2013";

		 document.write('<footer class="bottomGradient"><nav style="position:relative;"><div class="facilityHome"><a  onclick="getCurrentLandingPage()">Facility Home</a></div><div class="share" onclick="captureScreenshot();"><a>Send</a></div><div class="directory"><a onclick="loadDirectory();">Directory</a></div><div class="map" onclick="openMap();" ><a >Map</a></div><div class="aboutus"><a href="aboutus.html">About Us</a></div><div class="privacy"><a  onClick="showPolicy()">Privacy Policy</a></div><div class="website"><a onclick="loadURL();">Website</a></div><div class="drive" onclick="openLot();"><a href ="#">Before you<br>get here</a></div><div class="idea"><a href ="mailto: studio.operations2@nbcuni.com">Have an idea?</a></div><div class="more" ><a>More</a></div><section class="moreTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="Tooltipicon popidea"><a href ="mailto: studio.operations2@nbcuni.com"><br>Have an idea?</a></section><section class="Tooltipicon popDrive" onclick="openLot();"><a href ="#"><br>Before you<br>get here</a></section><section class="Tooltipicontop popWebsite" ><a onclick="loadURL();"><br>Website</a></section><section class="Tooltipicontop popPrivacy" ><a  onClick="showPolicy()"><br>Privacy Policy</a></section><section class="Tooltipicon popAboutus"><a href="aboutus.html"><br>About Us</a></section></section><section class="dwnssArrrow"></section></section></section><section class="sendTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="sendtipicon popSMS" ><a href="sms:?body='+smsTxt+'"><br>SMS</a></section><section class="sendtipicon popMail" onclick="takeScreenShot(mailSubject,mailBody,true,toEMail);"><a ><br>Email</a></section></section><section class="dwnssArrrow"></section></section></section></nav></footer>')
			 
	 }
	};

function loadFooter(){
document.write('<footer class="bottomGradient"><nav style="position:relative;"><div class="facilityHome"><a  onclick="getCurrentLandingPage()">Facility Home</a></div><div class="share" onclick="captureScreenshot();"><a>Send</a></div><div class="directory"><a onclick="loadDirectory();">Directory</a></div><div class="map" onclick="openMap();"><a >Map</a></div><div class="aboutus"><a href="aboutus.html">About Us</a></div><div class="privacy"><a  onClick="showPolicy()">Privacy Policy</a></div><div class="website"><a onclick="loadURL();">Website</a></div><div class="drive" onclick="openLot();"><a href ="#">Before you<br>get here</a></div><div class="idea"><a href ="mailto: studio.operations2@nbcuni.com">Have an idea?</a></div><div class="more" ><a>More</a></div><section class="moreTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="Tooltipicon popidea"><a href ="mailto: studio.operations2@nbcuni.com"><br>Have an idea?</a></section><section class="Tooltipicon popDrive" onclick="openLot();"><a href ="#"><br>Before you<br>get here</a></section><section class="Tooltipicontop popWebsite" ><a onclick="loadURL();"><br>Website</a></section><section class="Tooltipicontop popPrivacy" ><a  onClick="showPolicy()"><br>Privacy Policy</a></section><section class="Tooltipicon popAboutus"><a href="aboutus.html"><br>About Us</a></section></section><section class="dwnssArrrow"></section></section></section><section class="sendTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="sendtipicon popSMS" onclick="smsDisable();"><a ><br>SMS</a></section><section class="sendtipicon popMail" onclick="takeScreenShot(mailSubject,mailBody,true,toEMail);"><a ><br>Email</a></section></section><section class="dwnssArrrow"></section></section></section></nav></footer>')
};

function loadMailDisabledFooter(){
document.write('<footer class="bottomGradient"><nav style="position:relative;"><div class="facilityHome"><a  onclick="getCurrentLandingPage()">Facility Home</a></div><div class="share" onclick="captureScreenshot();"><a>Send</a></div><div class="directory"><a onclick="loadDirectory();">Directory</a></div><div class="map"><a href="map.html">Map</a></div><div class="aboutus"><a href="aboutus.html">About Us</a></div><div class="privacy"><a  onclick="showPolicy();">Privacy Policy</a></div><div class="website"><a onclick="loadURL();">Website</a></div><div class="drive" onclick="openLot();"><a href ="#">Before you<br>get here</a></div><div class="idea"><a href ="mailto: studio.operations2@nbcuni.com">Have an idea?</a></div><div class="more" ><a>More</a></div><section class="moreTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="Tooltipicon popidea"><a href ="mailto: studio.operations2@nbcuni.com"><br>Have an idea?</a></section><section class="Tooltipicon popDrive" onclick="openLot();"><a href ="#"><br>Before you<br>get here</a></section><section class="Tooltipicontop popWebsite" ><a onclick="loadURL();"><br>Website</a></section><section class="Tooltipicontop popPrivacy" ><a  onclick="showPolicy();"><br>Privacy Policy</a></section><section class="Tooltipicon popAboutus"><a href="aboutus.html"><br>About Us</a></section></section><section class="dwnssArrrow"></section></section></section><section class="sendTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="sendtipicon popSMS" onclick="smsDisable();"><a ><br>SMS</a></section><section class="sendtipicon popMail" onclick="takeScreenShot(mailSubject,mailBody,true,toEMail);"><a ><br>Email</a></section></section><section class="dwnssArrrow"></section></section></section></nav></footer>')

};


function loadMailSMSDisabledFooter(){
document.write('<footer class="bottomGradient"><nav style="position:relative;"><div class="facilityHome"><a  onclick="getCurrentLandingPage()">Facility Home</a></div><div class="share" onclick="captureScreenshot();"><a>Send</a></div><div class="directory"><a onclick="loadDirectory();">Directory</a></div><div class="map"><a href="map.html">Map</a></div><div class="aboutus"><a href="aboutus.html">About Us</a></div><div class="privacy"><a  onClick="showPolicy()">Privacy Policy</a></div><div class="website"><a onclick="loadURL();">Website</a></div><div class="drive" onclick="openLot();"><a href ="#">Before you<br>get here</a></div><div class="idea"><a href ="mailto: studio.operations2@nbcuni.com">Have an idea?</a></div><div class="more" ><a>More</a></div><section class="moreTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="Tooltipicon popidea"><a href ="mailto: studio.operations2@nbcuni.com"><br>Have an idea?</a></section><section class="Tooltipicon popDrive" onclick="openLot();"><a href ="#"><br>Before you<br>get here</a></section><section class="Tooltipicontop popWebsite" ><a onclick="loadURL();"><br>Website</a></section><section class="Tooltipicontop popPrivacy" ><a  onClick="showPolicy()"><br>Privacy Policy</a></section><section class="Tooltipicon popAboutus"><a href="aboutus.html"><br>About Us</a></section></section><section class="dwnssArrrow"></section></section></section><section class="sendTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="sendtipicon popSMS" onclick="smsDisable();"><a ><br>SMS</a></section><section class="sendtipicon popMail" onclick="disableMail();"><a ><br>Email</a></section></section><section class="dwnssArrrow"></section></section></section></nav></footer>')

};

function disableMail(){
	navigator.notification.alert(
		    'Email feature is not available.',  // message
		    {},         // callback
		    'E-Mail',    // title
		    'OK'      // Close button Name
		    );
	
}
function loadMapDisabledFooter(){
	if (platform.iphone) {
    document.write('<footer class="bottomGradient"><nav style="position:relative;"><div class="facilityHome"><a  onclick="getCurrentLandingPage()">Facility Home</a></div><div class="share" onclick="captureScreenshot();"><a>Send</a></div><div class="directory"><a onclick="loadDirectory();"">Directory</a></div><div class="map"><a  onclick="mapAvailabilityAlert();">Map</a></div><div class="aboutus"><a href="aboutus.html">About Us</a></div><div class="privacy"><a  onClick="showPolicy()">Privacy Policy</a></div><div class="website"><a onclick="loadURL();">Website</a></div><div class="drive" onclick="openLot();"><a href ="#">Before you<br>get here</a></div><div class="idea"><a href ="mailto: studio.operations2@nbcuni.com">Have an idea?</a></div><div class="more" ><a>More</a></div><section class="moreTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="Tooltipicon popidea"><a href ="mailto: studio.operations2@nbcuni.com"><br>Have an idea?</a></section><section class="Tooltipicon popDrive" onclick="openLot();"><a href ="#"><br>Before you<br>get here</a></section><section class="Tooltipicontop popWebsite" ><a onclick="loadURL();"><br>Website</a></section><section class="Tooltipicontop popPrivacy" ><a  onClick="showPolicy()"><br>Privacy Policy</a></section><section class="Tooltipicon popAboutus"><a href="aboutus.html"><br>About Us</a></section></section><section class="dwnssArrrow"></section></section></section><section class="sendTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="sendtipicon popSMS" onclick="sendSMS();"><a ><br>SMS</a></section><section class="sendtipicon popMail" onclick="takeScreenShot(mailSubject,mailBody,true,toEMail);"><a ><br>Email</a></section></section><section class="dwnssArrrow"></section></section></section></nav></footer>')
	}
	else{
		document.write('<footer class="bottomGradient"><nav style="position:relative;"><div class="facilityHome"><a  onclick="getCurrentLandingPage()">Facility Home</a></div><div class="share" onclick="captureScreenshot();"><a>Send</a></div><div class="directory"><a onclick="loadDirectory();"">Directory</a></div><div class="map"><a  onclick="mapAvailabilityAlert();">Map</a></div><div class="aboutus"><a href="aboutus.html">About Us</a></div><div class="privacy"><a  onClick="showPolicy()">Privacy Policy</a></div><div class="website"><a onclick="loadURL();">Website</a></div><div class="drive" onclick="openLot();"><a href ="#">Before you<br>get here</a></div><div class="idea"><a href ="mailto: studio.operations2@nbcuni.com">Have an idea?</a></div><div class="more" ><a>More</a></div><section class="moreTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="Tooltipicon popidea"><a href ="mailto: studio.operations2@nbcuni.com"><br>Have an idea?</a></section><section class="Tooltipicon popDrive" onclick="openLot();"><a href ="#"><br>Before you<br>get here</a></section><section class="Tooltipicontop popWebsite" ><a onclick="loadURL();"><br>Website</a></section><section class="Tooltipicontop popPrivacy" ><a  onClick="showPolicy()"><br>Privacy Policy</a></section><section class="Tooltipicon popAboutus"><a href="aboutus.html"><br>About Us</a></section></section><section class="dwnssArrrow"></section></section></section><section class="sendTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="sendtipicon popSMS" ><a href="sms:?body=Android users download from this link %0A %0A iPhone users download from this link "><br>SMS</a></section><section class="sendtipicon popMail" onclick="takeScreenShot(mailSubject,mailBody,true,toEMail);"><a ><br>Email</a></section></section><section class="dwnssArrrow"></section></section></section></nav></footer>')
	}
	
	};

function loadMapNyChDisabledFooter(){
			
	document.write('<footer class="bottomGradient"><nav style="position:relative;"><div class="facilityHome"><a  onclick="getCurrentLandingPage()">Facility Home</a></div><div class="share" onclick="captureScreenshot();"><a>Send</a></div><div class="directory"><a onclick="loadDirectory();"">Directory</a></div><div class="map"><a  onclick="mapAvailabilityAlert();">Map</a></div><div class="aboutus"><a href="aboutus.html">About Us</a></div><div class="privacy"><a  onClick="showPolicy()">Privacy Policy</a></div><div class="website"><a onclick="loadURL();">Website</a></div><div class="drive" onclick="openLot();"><a href ="#">Before you<br>get here</a></div><div class="idea"><a href ="mailto: studio.operations2@nbcuni.com">Have an idea?</a></div><div class="more" ><a>More</a></div><section class="moreTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="Tooltipicon popidea"><a href ="mailto: studio.operations2@nbcuni.com"><br>Have an idea?</a></section><section class="Tooltipicon popDrive" onclick="openLot();"><a href ="#"><br>Before you<br>get here</a></section><section class="Tooltipicontop popWebsite" ><a onclick="loadURL();"><br>Website</a></section><section class="Tooltipicontop popPrivacy" ><a  onClick="showPolicy()"><br>Privacy Policy</a></section><section class="Tooltipicon popAboutus"><a href="aboutus.html"><br>About Us</a></section></section><section class="dwnssArrrow"></section></section></section><section class="sendTooltip"><section class="moreTooltipinner"><section class="moreTooltipiconcover"><section class="sendtipicon popSMS" onclick="smsDisable();"><a ><br>SMS</a></section><section class="sendtipicon popMail" onclick="takeScreenShot(mailSubject,mailBody,true,toEMail);"><a ><br>Email</a></section></section><section class="dwnssArrrow"></section></section></section></nav></footer>')
		
};

function smsDisable(){
	
	navigator.notification.alert(
		    'SMS feature is not available.',  // message
		    {},         // callback
		    'SMS',    // title
		    'OK'      // Close button Name
		    );}
		
function showCommissaryMenu(){
    checkConnection();
	if(connectionAvailable !=="false"){
	if (platform.android)
    {
		window.plugins.childBrowser.openExternal(COMMISSARY_MENU_URL);
    }else{
	     window.plugins.childBrowserIOS.showWebPage(COMMISSARY_MENU_URL);
    }
    }
}

function loadURL(){
	checkConnection();
     if(connectionAvailable !=="false"){
    if (platform.android)
    {
        window.plugins.childBrowser.openExternal(WEBSITE_URL);
    }
    else{
        window.open(WEBSITE_URL);	
    }
    return false;
} 
}

function getCurrentLandingPage(){
    var facilityHome= localStorage.getItem("CurPage");
    window.location=facilityHome;

}

function setCurrentPageUniversal(){
    localStorage.setItem("CurPage","universalLanding.html");
    localStorage.setItem("currentLocationId","1");
//    document.getElementById("nc").style.visibility='hidden';
//    document.getElementById("us").style.visibility='visible';
}

function setCurrentPageChicago(){
    localStorage.setItem("CurPage","chicagoLanding.html");
    localStorage.setItem("currentLocationId","3");
//    document.getElementById("nc").style.visibility='visible';
//    document.getElementById("us").style.visibility='hidden';

    
}

function setCurrentPageNewyork(){
    localStorage.setItem("CurPage","newyorkLanding.html");
    localStorage.setItem("currentLocationId","2");

//    document.getElementById("nc").style.visibility='visible';
//    document.getElementById("us").style.visibility='hidden';

}



//call email composer
function takeScreenShot(subject,mbody,hasAttachment,toMailId) {

	if(hasAttachment == true)//With screenshot
	{
		if (platform.iphone) {
	     window.plugins.emailComposer.showEmailComposerWithCallback(function(result){console.log(result);},subject,mbody,[],[],[],true,["withScreenshot"]);
		}
		else if (platform.android) {
			window.plugins.emailComposer.showEmailComposer(subject,mbody,[],[],[],true,["withScreenshot"]);
		}
	}
	else    //Without screenshot
	    {
	        if (platform.iphone) {
	            window.plugins.emailComposer.showEmailComposerWithCallback(function(result){console.log(result);},subject,mbody,[toMailId],[],[],true,[""]);
		}
	        else if (platform.android) {
	            window.plugins.emailComposer.showEmailComposer(subject,mbody,[toMailId],[],[],true,[""]);
		}

	    }

	}


function captureScreenshot()
{
		window.plugins.Screenshot.showScreenshot("","",[],[],[],true,[""]);		
}


function sendSMS(){
   
    var smsContent="";
    var currentFacility=localStorage.getItem("CurPage");
	if(currentFacility=="universalLanding.html"){
		smsContent="Universal Studios General Contact , Email:studio.operations@nbcuni.com ,  Phone: 1.800.892.1979";
	}
	else if(currentFacility=="chicagoLanding.html"){
		smsContent="Chicago General Contact , Email:trisha.hockings@nbcuni.com ,  Phone: 1.312.836.5800";
	}
	else{
		smsContent="New York General Contact , Email:marybeth.scalici@nbcuni.com ,  Phone: 1.212.664.2013";
	}
    window.plugins.smsComposer.showSMSComposer('', smsContent);

}

function showPolicy(){
	checkConnection();
    if(connectionAvailable !=="false"){
	if (platform.android)
    {
		window.plugins.childBrowser.openExternal(PRIVACY_POLICY_URL);
    }else{
	     window.plugins.childBrowserIOS.showWebPage(PRIVACY_POLICY_URL);
    }
     }
}



function showVirtualTour(){
	checkConnection();
    if(connectionAvailable !=="false"){
	 var ua = navigator.userAgent;
	 var platform = {
	 iphone: ua.match(/(iPhone|iPod|iPad)/),
	 android: ua.match(/Android/)
	 };

	    if (platform.android)
	     {
	     window.plugins.childBrowser.openExternal(VIRTUAL_TOUR_URL);
	     }
	    else
	     {
	     window.plugins.childBrowserIOS.showWebPage(VIRTUAL_TOUR_URL);
	     }
	 
	}
}

function loadDirectory(){
        window.open("../html/directory.html");
        
}
function getBacklotName(){
	 localStorage.setItem("categorySelected","default");
	 }

function getPlatform(){
	  var ua = navigator.userAgent;
	  var platform = {
	      iphone: ua.match(/(iPhone|iPod|iPad)/),
	      android: ua.match(/Android/)
	  };
	   
	   if (platform.android){
	       var element = document.getElementById("headerBackHideDiv");
	       element.style.display='block';
	       var element = document.getElementById("backButtonDiv");
	       element.style.display = 'none';
	   }
	   else{
		     var element = document.getElementById("backButtonDiv");
		      element.style.display = 'block';
		     var element = document.getElementById("headerBackHideDiv");
		       element.style.display="none";
		  } 
	}



    var deviceInfo = function(){        
            var networkState = navigator.network.connection.type;
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.NONE]     = 'No network connection';
        
            if(states[networkState] == "Unknown connection" || states[networkState] == "No network connection")
            {
             connectionAvailable = 'false';       
            	navigator.notification.alert(
            		    'Please check your network connection and try again.',  // message
            		    {},         // callback
            		    'Network',    // title
            		    'OK'      // Close button Name
            		    );
                              		
            }
           
    }

    
    
    function openMap(){
    	var currentFacility=localStorage.getItem("CurPage");
        localStorage.setItem("fromBack","Stage");
    	if(currentFacility=="universalLanding.html"){
    		
    		if (platform.iphone) {
    		window.location="../html/map.html";
    		}
    		else{
    		window.open("../html/map.html");
    		}
    	}
    	else{
    		navigator.notification.alert(
    			    'Not available for this location.',  // message
    			    {},         // callback
    			    'Map',    // title
    			    'OK'      // Close button Name
    			    ); Ê   	}
    }

    function openLot(){
    	var currentFacility=localStorage.getItem("CurPage");
    	if(currentFacility=="universalLanding.html"){
    		
    		if (platform.iphone) {
    		window.location="../html/beforeYouGetHere.html";
    		}
    		else{
    		window.open("../html/beforeYouGetHere.html");
    		}
    	}
    	else{
    		navigator.notification.alert(
    			    'Not available for this location.',  // message
    			    {},         // callback
    			    'Before you get here',    // title
    			    'OK'      // Close button Name
    			    ); Ê   	}
    }


    function checkConnection(){
    	document.addEventListener("deviceready", deviceInfo, true);
    }
    
    
function emailScreenshot(){
	captureScreenshot();
    mailBody ='NBCU Studio app is available for free download from '+ '<a href='+ITUNES_URL+'>App Store</a>'+ ' & ' +'<a href='+GOOGLE_PLAY_URL+'>Play Store</a>';
	takeScreenShot(mailSubject,mailBody,true,"");
}

function mapAvailabilityAlert(){


	navigator.notification.alert(
		    'Not available for this location.',  // message
		    {},         // callback
		    'Map',    // title
		    'OK'      // Close button Name
		    );
}

function emailWithLink(){
    captureScreenshot();
    var url = localStorage.getItem("link");
    var urlLabel = localStorage.getItem("serviceName");
  mailBody = '<a href="' + url + '">'+urlLabel+'</a>';
  takeScreenShot(mailSubject,mailBody,true,"");
   }


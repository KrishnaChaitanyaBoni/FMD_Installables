
var sorceService,destService;
var destServiceName;
var ua = navigator.userAgent;

function showLocation(position) {
	
    latitude1 = position.coords.latitude;
    longitude1 = position.coords.longitude;   
    localStorage.setItem('currlat',latitude1);
    localStorage.setItem('currlon',longitude1);
    getMapRoute();
}


//refreshing page

function refreshPage(){
    window.location.href=window.location.href;
}

//To get the source place Name to draw route.

 function getSourceServiceName(){
 sorceService = localStorage.getItem("currposition");
 document.getElementById("source_name").innerHTML=sorceService;
//  return mysevice;
}


// To get the destination service Name

function getDestinationServiceName(){
 destService = localStorage.getItem("serviceName");
 document.getElementById("dest_name").innerHTML=destService;
 document.getElementById("bname").innerHTML=destService;
 document.getElementById("scrollDest").innerHTML=destService;
//  return mysevice;
}
 
//if there is any error to accesing the user's current location thi methos will call and send error message.
 
function errorHandler(err) {
//    if(err.code == 1) {
//        navigator.notification.alert('Error: Access is denied!',{},' ','Done');
//    }else if( err.code == 2) {
//        navigator.notification.alert('Error: Position is unavailable!',{},' ','Done');
//    }
}

//Geolocation which will return the users current location
function getMyLocation(){
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showLocation, errorHandler,
                                                 {
                                                 enableHighAccuracy : true,
                                                 timeout : 10000, // 10s
                                                 maximumAge : 0
                                                 }
                                                 );
    }else
    {
//    navigator.notification.alert('Sorry, browser does not support geolocation!',{},' ','Done');
    }
}

//To Draw Route between the users location to Selected location.
function getMapRoute(){
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('mapRoute'), {
                                  zoom:7,
                                  mapTypeId:google.maps.MapTypeId.ROADMAP
                                  });
        directionsDisplay.setMap(map);
    var currLat= localStorage.getItem('currlat');
    var currLon= localStorage.getItem('currlon');
    var currlatNum = parseFloat(currLat);
    var currlonNum = parseFloat(currLon);
    var lat = localStorage.getItem('lat');
    var latNum = parseFloat(lat);
    var lon = localStorage.getItem('lon');
    var lonNum = parseFloat(lon);
    //passing source destination value to draw route
    var request = {
//     origin:new google.maps.LatLng(34.142113,-118.353863),
       origin:new google.maps.LatLng(currlatNum,currlonNum),
    destination:new google.maps.LatLng(latNum,lonNum),
    travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            }
                            });
 // var mapurl = "http://maps.google.com/maps?saddr=(34.142113,-118.353863)"+"&daddr="+latNum+","+lonNum;
  var mapurl = "http://maps.google.com/maps?saddr="+currlatNum+","+currlonNum+"&daddr="+latNum+","+lonNum;
   localStorage.setItem("link",mapurl);
    directionsDisplay.setPanel(document.getElementById('routelistCnts'));
}



var map;
var level=14;
var centerLat=34.045334;
var centerLong=-118.248425;
var directionsService = new google.maps.DirectionsService();

function getPersonalisedRoute() {
    
    var rendererOptions = {
    draggable: false
    };
    
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    
    var my_place = new google.maps.LatLng(centerLat,centerLong);
    var myOptions = {
    zoom:level,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: my_place
    }
    map = new google.maps.Map(document.getElementById("mapRoute"), myOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('RoutePOP'));
}

function calcRoute() {
    
    var start = document.getElementById("sourcePlace").value;
    var end = document.getElementById("destinationPlace").value;
    var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    
    directionsService.route(request, function(response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            }
                            });
}



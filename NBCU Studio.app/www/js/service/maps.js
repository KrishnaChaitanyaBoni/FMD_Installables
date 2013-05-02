var stageIcon="../images/maps/red.png";
var backlotIcon = "../images/maps/directionIcon.png";
var prodServIcon = "../images/maps/directionlistIcon.png";
var digServIcon = "../images/maps/help.png";
var parkinglotIcon = "../images/maps/pegman.png";

var markerIcon = "../images/maps/red.png";

var selectOption="Stage";
var all=[];
var map, GeoMarker;
var Level=16;
var cLat=34.14165992;
var cLong=-118.3591687;
var name;
var isFirstLoad = 0;
var marker;
var oldMarkers = null;
var mapsMarkerArr;


function showHidePop(obj)
{
	console.log("clicked");
	$(".detailPop").show();
}


//selecting category based on dropdown selection
function mapCategoryStageDefault(){
    deleteMarkers();
    Level=17;
    cLat=34.14157447;
    cLong=-118.35735258;
    localStorage.setItem("fromBack","Stage");
	getMapDetails("Stage");
    $(".mapDiv1").show();
		$(".mapDiv2, .mapDiv3, .mapDiv4, .mapDiv5, .mapDiv6, .mapDiv7, .mapDiv8, .mapDiv9").hide();
	
}

//check the map category selection
function mapCategoryStage(){
    deleteMarkers();
    Level=17;
    cLat=34.14157447;
    cLong=-118.35735258;
    map.panTo(new google.maps.LatLng(cLat,cLong));
    localStorage.setItem("fromBack","Stage");
    markerIcon = stageIcon;
	getMapDetails("Stage");
    $(".mapDiv1").show();
		$(".mapDiv2, .mapDiv3, .mapDiv4, .mapDiv5, .mapDiv6, .mapDiv7, .mapDiv8, .mapDiv9").hide();	
	
}

//category Backlot Selected
function mapCategoryBacklot(){
    
    deleteMarkers();
    Level=15;
    cLat=34.13920593;
    cLong=-118.3477709;
    map.panTo(new google.maps.LatLng(cLat,cLong));
    localStorage.setItem("fromBack","Backlot");
    markerIcon = backlotIcon;
    getMapDetails("Backlot");
    	$(".mapDiv2").show();
	$(".mapDiv1, .mapDiv3, .mapDiv4, .mapDiv5, .mapDiv6, .mapDiv7, .mapDiv8, .mapDiv9").hide();

	
}

//category Production Services Selected

function mapCategoryProductionServices(){
    deleteMarkers();
    Level=17;
    cLat=34.14161699;
    cLong=-118.35406638;
     //Make map global
    map.panTo(new google.maps.LatLng(cLat,cLong));
    localStorage.setItem("fromBack","Production Services");
    markerIcon = prodServIcon;
    getMapDetails("Production Services");
    	$(".mapDiv3").show();
	$(".mapDiv1, .mapDiv2, .mapDiv4, .mapDiv5, .mapDiv6, .mapDiv7, .mapDiv8, .mapDiv9").hide();

}

//category working on the lot Selected

function mapCategoryWorkingonthelot(){
    deleteMarkers();
    Level=17;
    cLat=34.14078303;
    cLong=-118.35910662;
    map.panTo(new google.maps.LatLng(cLat,cLong));
    localStorage.setItem("fromBack","Working on the lot");
	getMapDetails("Working on the lot");
    	$(".mapDiv5").show();
	$(".mapDiv1, .mapDiv2, .mapDiv3, .mapDiv4, .mapDiv6, .mapDiv7, .mapDiv8, .mapDiv9").hide();

}

//category Digital services Selected

function mapCategoryDigitalServices(){
    deleteMarkers();
	Level=16;
    cLat=34.14252476;
    cLong=-118.35663231;
    map.panTo(new google.maps.LatLng(cLat,cLong));
    localStorage.setItem("fromBack","Digital Services");
    markerIcon = digServIcon;
    getMapDetails("Digital Services");
    	$(".mapDiv6").show();
	$(".mapDiv1, .mapDiv2, .mapDiv3, .mapDiv4, .mapDiv5, .mapDiv7, .mapDiv8, .mapDiv9").hide();

}

//category Parking Lots Selected

function mapCategoryParkingLots(){
    deleteMarkers();
    Level=14;
    cLat=34.14182847;
    cLong=-118.34827668;
    map.panTo(new google.maps.LatLng(cLat,cLong));
    localStorage.setItem("fromBack","Parking Lots");
    markerIcon = parkinglotIcon;
    getMapDetails("Parking Lots");
	$(".mapDiv8").show();
	$(".mapDiv1, .mapDiv2, .mapDiv3, .mapDiv4, .mapDiv5, .mapDiv6, .mapDiv7, .mapDiv9").hide();
}


//category Office Building Selected

function mapCategoryOffice(){
    deleteMarkers();
 	Level=17;
    cLat=34.14182254;
    cLong=-118.35091484;
    map.panTo(new google.maps.LatLng(cLat,cLong));
    localStorage.setItem("fromBack","Office Buildings");
    getMapDetails("Office Buildings");
	$(".mapDiv9").show();
	$(".mapDiv1, .mapDiv2, .mapDiv3, .mapDiv4, .mapDiv5, .mapDiv6, .mapDiv7, .mapDiv8").hide();    
}

//category PostProduction Selected

function mapCategoryPostProduction(){
    deleteMarkers();
	Level=17;
    cLat=34.14004137;
    cLong=-118.35905633;
    map.panTo(new google.maps.LatLng(cLat,cLong));
    localStorage.setItem("fromBack","Post Production");
    getMapDetails("Post Production");
	$(".mapDiv4").show();
	$(".mapDiv1, .mapDiv2, .mapDiv3, .mapDiv5, .mapDiv6, .mapDiv7, .mapDiv8, .mapDiv9").hide();
}

//category General Selected

function mapCategoryGeneral(){
    deleteMarkers();
    Level=16;
    cLat=34.14144228
    cLong=-118.35215171;
    map.panTo(new google.maps.LatLng(cLat,cLong));
    localStorage.setItem("fromBack","General");
    getMapDetails("General");
	$(".mapDiv7").show();
	$(".mapDiv1, .mapDiv2, .mapDiv3, .mapDiv4, .mapDiv5, .mapDiv6, .mapDiv8, .mapDiv9").hide();
}


function onConfirm(button){
    if(button == 2)
    {
        GeoMarker = new GeolocationMarker();
        GeoMarker.setCircleOptions({fillColor: '#808080'});
        google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
                                          map.setCenter(this.getPosition());
                                          map.fitBounds(this.getBounds());
                                          });
        google.maps.event.addListenerOnce(GeoMarker, 'geolocation_error', function(e) {
                                          navigator.notification.alert('This app needs your permission to access your location. Please activate it in Location services under Settings.',{},'Permission Request','Done');
                                          });
        GeoMarker.setMap(map);
        }
}



//getGeoLocation of the user
function getGeoLocation() {
   
    navigator.notification.confirm(
                                   'NBCU Studio would like to use your current location',  // message
                                   onConfirm,         // callback
                                   'Permission Request',    // title
                                   'Do not Allow,Allow'      // Close button Name
                                   );
 }

// Query the database
function getMapDetails(selectOption){
    initDB();
	myDB.transaction(function(tx) {
    tx.executeSql('SELECT display_name,latitude,longitude from mapslocations WHERE category_name=?', [selectOption], mapsQuerySuccess, mapsErrorCB);
        
    });
}


//Query Success will call this method
function mapsQuerySuccess(tx, results) {
    mapsMarkerArr=new Array();
	dataset = results.rows;
	if(dataset.length>0){
		for(var i=0;i<dataset.length;i++){
			mapsMarkerArr[i]=new Array();
		   	mapsData = dataset.item(i);
			mapsMarkerArr[i][0]=mapsData['display_name'];
			mapsMarkerArr[i][1]=mapsData['latitude'];
			mapsMarkerArr[i][2]=mapsData['longitude'];
        }
	}
	initialize(mapsMarkerArr);
}

//by Default this function called
function getDefaultCategory(){
    var fromBack=localStorage.getItem("fromBack");
  
    if(fromBack == null || fromBack == ''){
    fromBack="Stage";
    }
    getMapDetails(fromBack);
}
//if there is any error call this method.
function mapsErrorCB(err) {
    console.log("Error processing SQL: "+err.code);
}


//Map Loading 
function mapLoading(){
    var myOptions = {
    zoom: Level,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    // assinging marker data into an local array.alert
    var infoWindow = new google.maps.InfoWindow;
    map = new google.maps.Map(document.getElementById('googlemap'), myOptions);
    var mapCenter = new google.maps.LatLng(cLat, cLong);
    map.setCenter(mapCenter);
    isFirstLoad = 1;
}


//Default method
function initialize1()
{
}
 var curr_infw;
//To load the Main map.
function initialize(mapsMarkerArr) {
    if(isFirstLoad == 0){
        mapLoading();
    }
    var markerlatlong;
   
    
    //callback method on clicking each marker into map.
    function infoCallback(infowindow, marker, markerName) { return function() { if(curr_infw) 
        { curr_infw.close();
        }
        curr_infw=infowindow; 
        infowindow.open(map, marker);
        markerlatlong= marker.getPosition();
        var lat=markerlatlong.lat(); 
        var lon=markerlatlong.lng();
        var val1= infowindow.getContent(this.id);
        var locationName = val1.substring(82, (val1.length-12));
        localStorage.setItem('serviceName',locationName);
        localStorage.setItem('serviceName', markerName);
        localStorage.setItem('lat',lat); 
        localStorage.setItem('lon',lon);
        
    };
    }   
    
      //set marker to main map
function setMarkers(map, all)
    {
    oldMarkers = [];
    for (i=0;i<all.length;i++) {
    var newmarker = all[i][0];
    var firstLocName="";	
    var multipleLocations = false;
    if (newmarker.indexOf(',') !== -1)
        {
          firstLocName = newmarker.substring(0,newmarker.indexOf(','));
          multipleLocations = true;
        }
    var lat = all[i][1];
    var lng = all[i][2];
    var latlngset;
    latlngset = new google.maps.LatLng(lat, lng);
//adding marker properties here to display by infowindow.
    var marker = new google.maps.Marker({
    map: map,
    position: latlngset,
    icon:"../images/maps/red.png"
     });
    oldMarkers.push(marker);
        if(multipleLocations == true){
            var content = '<div class="map-content" style="position:relative;">';
            content+='<a href="../html/routeMap.html"><div style="float:left;min-width:45px;min-height:45px;">&nbsp;</div></a>';
            content+='<div class="popClick" style="float:left;width:80px;margin-left:0px;padding-left:5px;height:45px;line-height:45px;font-size:10px;color:#335;overflow:hidden;padding-right:10px;word-wrap:break-word;" onclick="showHidePop(this);">' + firstLocName +'</div>';
            content+='<div class="popClick" style="float:left;background:red;width:10px"></div>';
            content+='</div><a href="../html/routeMap.html"><div class="detailPop" style="position:absolute;display:none;width:120px;margin:0px 0px 0px 150px;padding:2px;background:#231;padding:6px; line-height:16px; overflow:hidden;color:white;font-size:10px;-webkit-border-radius:10px;">'+newmarker +'</div></a>';
            }
        else{
//            var content = '<div class="map-content" style="position:relative;">';
//            content+='<a href="../html/routeMap.html"><div style="float:left;min-width:45px;min-height:45px;">&nbsp;</div>';
//            content+='<div style="width:80px;margin-left:0px;padding-left:5px;height:45px;line-height:45px;font-size:10px;color:#335;padding-right:10px;overflow:hidden;margin-right:5px;word-wrap:break-word;">' + newmarker +'</div>';
//            content+='<div style="float:left;background:red;width:10px"></div>';
//            content+='</a></div>';
            var content = '<div class="map-content" style="position:relative;">';
            content+='<a href="../html/routeMap.html"><div style="float:left;min-width:45px;min-height:45px;">&nbsp;</div></a>';
            content+='<div class="popClick" style="float:left;width:80px;margin-left:0px;padding-left:5px;height:45px;line-height:45px;font-size:10px;color:#335;overflow:hidden;padding-right:10px;word-wrap:break-word;" onclick="showHidePop(this);">' + newmarker +'</div>';
            content+='<div class="popClick" style="float:left;background:red;width:10px"></div>';
            content+='</div><a href="../html/routeMap.html"><div class="detailPop" style="position:absolute;display:none;width:120px;margin:0px 0px 0px 150px;padding:2px;background:#231;padding:6px; line-height:16px; overflow:hidden;color:white;font-size:10px;-webkit-border-radius:10px;">'+newmarker +'</div></a>';
            }
    var myOptions = {
    content: content
    ,disableAutoPan: false
    ,maxWidth: 0
    ,pixelOffset: new google.maps.Size(-75, -90)
    ,zIndex: null
    ,boxStyle: { 
    background: "url('../images/maps/infoBack.png') no-repeat"
    ,width: "155px"
    ,minHeight: "56px"
     }
    ,closeBoxMargin: "10px 2px 2px 2px"
    ,closeBoxURL: ""//"http://www.google.com/intl/en_us/mapfiles/close.gif"
    ,infoBoxClearance: new google.maps.Size(1, 1)
    ,isHidden: false
    ,pane: "floatPane"
    ,enableEventPropagation: false
    ,position: latlngset
     };
            
    var ib = new InfoBox(myOptions);
    google.maps.event.addListener(marker,'click',infoCallback(ib, marker, newmarker))
    google.maps.event.addListener(map, 'click', function() {
    if(curr_infw) { curr_infw.close();}
    });
    }
    }
// Set all markers in the all variable
setMarkers(map, mapsMarkerArr);
    
}
google.maps.event.addDomListener(window, 'load', initialize1);


function deleteMarkers(){
    if(oldMarkers && oldMarkers.length !== 0){
    	if(curr_infw) { curr_infw.close();}
        for(var i = 0; i < oldMarkers.length; i++){
            oldMarkers[i].setMap(null);
            oldMarkers[i] = null;
        }
        oldMarkers = null;
    }
}






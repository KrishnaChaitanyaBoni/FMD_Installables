$(document).ready(function(){
    $(".selectSlider").hide();
    var h = $(".selectSlider").height();
    var a = h/2;
    var w = $(window).height() / 2;
    var t = w - a + 10;
    $(".selectSlider").css("left","-246px");
    $(".selectSlider").css("top", t);
    $(".selectIcn, .selectSlider .close, .selectSlider .listName").click(function(){
    $(".selectSlider").show();
    var h = $(".selectSlider").height();
    var a = h/2;
    var w = $(window).height() / 2;
    var t = w - a + 10;
    var r = $(".selectSlider").offset().left;
    if(r < -3)
    {
    $(".selectSlider").css("top", t);	
    $(".selectSlider").animate({left:"-3px"});
    }
    else
    {
    $(".selectSlider").animate({left:"-246px"},function(){$(".selectSlider").hide();$(".selectSlider .listName").removeClass("listHighlight");});
     }
     });
    $("footer nav .facilityHome a, footer nav .directory a, footer nav .map a, footer nav .idea a, footer nav .share a, footer nav .more a, footer nav .aboutus a, footer nav .privacy a, footer nav .website a, footer, header, body").click(function(){ 
    var r = $(".selectSlider").offset().left;
    if(r == -3){$(".selectSlider").animate({left:"-246px"},function(){$(".selectSlider").hide();$(".selectSlider .listName").removeClass("listHighlight");});}
    });
    });

var combined;
var deptServiceName;

function getRoute(latitude,longitude,bckname){
	combined=(latitude + "," +longitude);
	localStorage.setItem('lat',latitude);
	localStorage.setItem('lon',longitude);
   	localStorage.setItem('serviceName',bckname)
	window.location='../html/routeMap.html';
}


function initaliseCategory(){
    selectedOption=localStorage.getItem("categorySelected");
    if(selectedOption=="default" || selectedOption == null){
        $(".backlotListcover").hide();
        $("#optionValue1").show();
    }
    else{
        categorySelection(selectedOption);
		
    }
}

function categorySelection(cat_name){
    selectedOption=cat_name;
 	if(selectedOption=="European/Spartacus"){
        localStorage.setItem("categorySelected",selectedOption);
        $(".backlotListcover").hide();
        $("#optionValue1").show();
		$(".backlotDiv1").show()
		$(".backlotDiv2, .backlotDiv3, .backlotDiv4, .backlotDiv5, .backlotDiv6, .backlotDiv7").hide()
        
 	}
 	else if(selectedOption=="New York Area"){
        $(".backlotListcover").hide();
        $("#optionValue2").show();
        localStorage.setItem("categorySelected",selectedOption);
		$(".backlotDiv2").show()
		$(".backlotDiv1, .backlotDiv3, .backlotDiv4, .backlotDiv6, .backlotDiv6, .backlotDiv7").hide()
        
 	}
 	else if(selectedOption=="Old West"){
        $(".backlotListcover").hide();
        $("#optionValue3").show();
        localStorage.setItem("categorySelected",selectedOption);
		$(".backlotDiv3").show()
		$(".backlotDiv1, .backlotDiv2, .backlotDiv4, .backlotDiv5, .backlotDiv6, .backlotDiv7").hide()
        
 	}
 	else if(selectedOption=="Parks, Lakes, Woods"){
        $(".backlotListcover").hide();
        $("#optionValue4").show();
        localStorage.setItem("categorySelected",selectedOption);
		$(".backlotDiv4").show()
		$(".backlotDiv1, .backlotDiv2, .backlotDiv3, .backlotDiv5, .backlotDiv6, .backlotDiv7").hide()
        
 	}
 	else if(selectedOption=="Practical"){
        $(".backlotListcover").hide();
        $("#optionValue5").show();
        localStorage.setItem("categorySelected",selectedOption);
		$(".backlotDiv5").show()
		$(".backlotDiv1, .backlotDiv2, .backlotDiv3, .backlotDiv4, .backlotDiv6, .backlotDiv7").hide()
        
 	}
 	else if(selectedOption=="Residential"){
        $(".backlotListcover").hide();
        $("#optionValue6").show();
        localStorage.setItem("categorySelected",selectedOption);
		$(".backlotDiv6").show()
		$(".backlotDiv1, .backlotDiv2, .backlotDiv3, .backlotDiv4, .backlotDiv5, .backlotDiv7").hide()
        
 	}
 	else {
 		$(".backlotListcover").hide();
        $("#optionValue7").show();
        localStorage.setItem("categorySelected",selectedOption);
		$(".backlotDiv7").show()
		$(".backlotDiv1, .backlotDiv2, .backlotDiv3, .backlotDiv4, .backlotDiv5, .backlotDiv6").hide()
    }
}


function getServiceDetails(element){
    departmentServiceName = element.id;
    localStorage.setItem('serviceName',departmentServiceName);
    var deptServiceName = "%"+element.id +"%";
    myDB.transaction(function(transaction) {
                     transaction.executeSql('select latitude,longitude from mapslocations where display_name like ? ',[deptServiceName], getServiceDetailsSuccessHandler, errorHandler);
                     
                     });
    
    
}
function getServiceDetailsSuccessHandler(transaction, results) {
	dataset = results.rows;
	if(dataset.length>0){
       	item = dataset.item(0);
    	var lat=item['latitude'];
		var lng = item['longitude'];
        var combined=lat+","+lng;
        localStorage.setItem("lat",lat);
        localStorage.setItem("lon",lng);
        window.location.href = "../html/routeMap.html";
    }
}

function errorHandler(transaction, error) {
	alert('Error was ' + error.message + ' (Code ' + error.code + ')');
}
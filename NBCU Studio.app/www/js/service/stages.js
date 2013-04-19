var sorceService,destService;
var ua = navigator.userAgent;
var destServiceName;
var platform = {
iphone: ua.match(/(iPhone|iPod|iPad)/),
android: ua.match(/Android/)
};


var title;
var area;
var length;
var width;
var height;
var pitsTanks;
var silentACAudience;
var wirelessInternet;
var pointLoad;
var tempStagesDataString;
var tempStagesPopStyle;
function getStages(startStageArea,endStageArea){
		tempStagesDataString = "";
		tempStagesPopStyle = "";
		myDB.transaction(function (tx) {
				
	        tx.executeSql('SELECT * FROM film_set,location WHERE film_set_group_id=2 AND location.location_id=film_set.location_id AND location_name="Universal Studios" AND area>'+parseInt(startStageArea)+' AND area<'+parseInt(endStageArea)+'', [], function (tx, result) {
            dataset = result.rows;
			if(dataset.length>0){
			for (var i = 0, item = null; i < dataset.length; i++) {
                item = dataset.item(i);
				title = item['film_set_name'];
				area =  item['area'];
				length =  item['length'];
				width =  item['width'];
				height =  item['height'];
				pitsTanks =  item['pits_tanks'];
				silentACAudience =  item['silentac_audience'];
				wirelessInternet =  item['wireless_internet'];
				pointLoad =  item['pointload'];
                
                var temp="";
        temp+=title;
        if(area !==""){
            
            temp+=", Area(Sq ft): "+area;
        }
        if(length !==""){
            
            temp+=", Length(ft): "+length;
        }
        if(width !==""){
            
            temp+=", Width(ft): "+width;
        }
        
        if(height !==""){
            
            temp+=", Height(ft): "+height;
        }
        if(pitsTanks!==""){
            
            temp+=", PitTanks: "+pitsTanks;
        }
        if(silentACAudience!==""){
            
            temp+=", SilentACAudience: "+silentACAudience;
        }
        if(wirelessInternet!==""){
            
            temp+=", WirelessInternet: "+wirelessInternet;
        }
        if(pointLoad!==""){
            
            temp+=", PointLoad: "+pointLoad;
        }
        
        
				tempStagesDataString+= '<li><a class="stagePOP" onclick="stagePopOver(this)" rel="#stgPopOver'+i+'Cnt"><section><div class="proCnt_header stageHDgradient"><p>'+title+'</p></div></section></a><span id="'+ title + '" class="locationBtn" onclick="getServiceDetails(this)"><a></a></span></li>'
                          if(i!==(dataset.length-1)){
                          tempStagesDataString+=  '<li class="listgap"></li> ';
                          }
                         
                        
				if (platform.iphone){
				tempStagesPopStyle+= '<div id="stgPopOver'+i+'Cnt"><div  style="position:relative;" class="hd stageHDgradient2"><p>'+title+'</p><div style="position:absolute;top:6px;right:10px;width:25px;height:25px;" onClick="emailScreenshot();"><img src="../images/universal/stageEmail.png" /></div><div style="position:absolute;top:6px;right:45px;width:25px;height:25px;" id="'+title+'" onclick="stageSms(this);"><img src="../images/universal/universalSMS.png" /></div></div><div class="hdBTM"></div><div class="div-table"><div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Area (Sq ft)</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+area+'</p></div></div> </div><div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Length (ft)</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+length+'</p></div></div> </div> <div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Width (ft)</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+width+'</p></div></div></div><div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Height (ft)</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+height+'</p></div></div> </div> <div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Pits / Tanks</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+pitsTanks+'</p></div></div> </div><div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Silent AC / Audience</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+silentACAudience+'</p></div></div> </div> <div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Wireless Internet</div></div><div class="div-table-col2"><div class="colInner"><p>'+wirelessInternet+'</p></div></div> </div><div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Point Load</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+pointLoad+'</p></div></div> </div></div></div>'
				}
				else {
					tempStagesPopStyle+= '<div id="stgPopOver'+i+'Cnt"><div  style="position:relative;" class="hd stageHDgradient2"><p>'+title+'</p><div style="position:absolute;top:6px;right:10px;width:25px;height:25px;" onClick="emailScreenshot();"><img src="../images/universal/stageEmail.png" /></div><div style="position:absolute;top:6px;right:45px;width:25px;height:25px;" id="'+title+'" ><a href="sms:?body='+temp+' "><img src="../images/universal/universalSMS.png" /></a></div></div><div class="hdBTM"></div><div class="div-table"><div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Area (Sq ft)</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+area+'</p></div></div> </div><div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Length (ft)</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+length+'</p></div></div> </div> <div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Width (ft)</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+width+'</p></div></div></div><div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Height (ft)</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+height+'</p></div></div> </div> <div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Pits / Tanks</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+pitsTanks+'</p></div></div> </div><div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Silent AC / Audience</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+silentACAudience+'</p></div></div> </div> <div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Wireless Internet</div></div><div class="div-table-col2"><div class="colInner"><p>'+wirelessInternet+'</p></div></div> </div><div class="div-table-row"><div class="div-table-col"><div class="colInner"><p>Point Load</p></div></div><div class="div-table-col2"><div class="colInner"><p>'+pointLoad+'</p></div></div> </div></div></div>'
				
				}

			}
			}
			
			document.getElementById("loadStagesData").innerHTML= tempStagesDataString;
			document.getElementById("loadPopupData").innerHTML= tempStagesPopStyle;
		});
		
		});
		}
        
function stageSms(element){
    
    var title = element.id;
    
	myDB.transaction(function(transaction) {
                     transaction.executeSql('select * from film_set where film_set_name=?',[title], composeStageSMSSuccessHandler, errorHandler);
                     });

}

function composeStageSMSSuccessHandler(transaction, results){
    
	dataset = results.rows;
   	if(dataset.length>0){
       	item = dataset.item(0);
        
var title=item['film_set_name'];
var area =  item['area'];
var length=  item['length'];
var width=  item['width'];
var height=  item['height'];
var pitsTanks=  item['pits_tanks'];
var silentACAudience=  item['silentac_audience'];
var wirelessInternet=  item['wireless_internet'];
var pointLoad =  item['pointload'];        

        var temp="";
        temp+=title;
        if(area !==""){
            
            temp+=", Area(Sq ft): "+area;
        }
        if(length !==""){
            
            temp+=", Length(ft): "+length;
        }
        if(width !==""){
            
            temp+=", Width(ft): "+width;
        }
        
        if(height !==""){
            
            temp+=", Height(ft): "+height;
        }
        if(pitsTanks!==""){
            
            temp+=", PitTanks: "+pitsTanks;
        }
        if(silentACAudience!==""){
            
            temp+=", SilentACAudience: "+silentACAudience;
        }
        if(wirelessInternet!==""){
            
            temp+=", WirelessInternet: "+wirelessInternet;
        }
        if(pointLoad!==""){
            
            temp+=", PointLoad: "+pointLoad;
        }
        
        
        
    } //end of if
      window.plugins.smsComposer.showSMSComposer('', temp);
    
}
function errorHandler(transaction, error) {
	alert('Error was ' + error.message + ' (Code ' + error.code + ')');
}

function bodyLoad(){
    if($(window).width()<600){
		$("#val2").append(10000);
		getStages(0,10000);
    }
    else{
		$("#val2").append(30000);
		getStages(0,30000);
    }
}

function composeSmsNYChicago(title,area,length,width,height,pitsTanks,silentACAudience,wirelessInternet,pointLoad)
{
    var temp="";
    temp+=title;
    if(area !==""){
        
        temp+=", Area(Sq ft): "+area;
    }
    if(length !==""){
        
        temp+=", Lenght(ft): "+length;
    }
    if(width !==""){
        
        temp+=", Width(ft): "+width;
    }
    
    if(height !==""){
        
        temp+=", Height(ft): "+height;
    }
    if(pitsTanks!==""){
        
        temp+=", PitTanks: "+pitsTanks;
    }
    if(silentACAudience!==""){
        
        temp+=", SilentACAudience: "+silentACAudience;
    }
    if(wirelessInternet!==""){
        
        temp+=", WirelessInternet: "+wirelessInternet;
    }
    if(pointLoad!==""){
        
        temp+=", PointLoad: "+pointLoad;
    }
    
    window.plugins.smsComposer.showSMSComposer('', temp);
 
}

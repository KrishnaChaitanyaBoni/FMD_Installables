(function()
{var c=!0,d=null,e;
    
function f(a,b,g)
{var h={clickable:!1,cursor:"pointer",draggable:!1,flat:c,icon:new google.maps.MarkerImage("https://google-maps-utility-library-v3.googlecode.com/svn/trunk/geolocationmarker/images/gpsloc.png",new google.maps.Size(34,34),d,new google.maps.Point(8,8),new google.maps.Size(17,17)),optimized:!1,position:new google.maps.LatLng(0,0),title:"Current location",zIndex:2};b&&(h=i(h,b));b={clickable:!1,radius:0,strokeColor:"1bb6ff",strokeOpacity:0.4,fillColor:"61a0bf",fillOpacity:0.4,strokeWeight:1,
zIndex:1};g&&(b=i(b,g));this.b=new google.maps.Marker(h);this.a=new google.maps.Circle(b);this.map=this.position=this.accuracy=d;this.set("minimum_accuracy",d);this.set("position_options",{enableHighAccuracy:c,maximumAge:1E3});this.a.bindTo("map",this.b);a&&this.setMap(a)}f.prototype=new google.maps.MVCObject;f.prototype.set=function(a,b){if(/^(?:position|accuracy)$/i.test(a))throw"'"+a+"' is a read-only property.";/map/i.test(a)?this.setMap(b):google.maps.MVCObject.prototype.set.apply(this,arguments)};
e=f.prototype;e.b=d;e.a=d;e.getMap=function()
{return this.map};
e.e=function()
{return this.get("position_options")};
e.j=function(a){this.set("position_options",a)};
e.getPosition=function(){return this.position};
e.getBounds=function()
{return this.position?this.a.getBounds():d};
e.f=function(){return this.accuracy};e.c=function(){return this.get("minimum_accuracy")};e.i=function(a){this.set("minimum_accuracy",a)};e.d=-1;
e.setMap=function(a){this.map=a;this.
notify("map");if(a)
{var b=this;navigator.geolocation&&(this.d=navigator.geolocation.watchPosition(function(a)
    {a:
        {var h=new google.maps.LatLng(a.coords.latitude,a.coords.longitude),
            j=b.b.getMap()==d;if(j)
            {
                if(b.c()!=d&&a.coords.accuracy>b.c())break a;b.b.setMap(b.map);
                b.b.bindTo("position",b);
                b.a.bindTo("center",b,"position");
                b.a.bindTo("radius",b,"accuracy")}
                b.accuracy!=a.coords.accuracy&&google.maps.MVCObject.prototype.set.call(b,"accuracy",a.coords.accuracy);
(j||b.position==d||!b.position.equals(h))&&google.maps.MVCObject.prototype.set.call(b,"position",h)}},
function(a)
{google.maps.event.trigger(b,"geolocation_error",a)},
this.e()))}
else this.b.unbind("position"),
this.a.unbind("center"),
this.a.unbind("radius"),
this.position=this.accuracy=d,
navigator.geolocation.clearWatch(this.d),
this.d=-1,this.b.setMap(a)};
e.h=function(a)
{this.b.setOptions(i({},a))};
e.g=function(a)
{this.a.setOptions(i({},a))};
function i(a,b)
{
    for(var g in b)k[g]!==c&&(a[g]=b[g]);
    return a}
    var k={map:c,position:c,radius:c};
    f.prototype.getAccuracy=f.prototype.f;
    f.prototype.getBounds=f.prototype.getBounds;
    f.prototype.getMap=f.prototype.getMap;f.prototype.getMinimumAccuracy=f.prototype.c;
    f.prototype.getPosition=f.prototype.getPosition;
    f.prototype.getPositionOptions=f.prototype.e;
    f.prototype.setCircleOptions=f.prototype.g;
    f.prototype.setMap=f.prototype.setMap;
    f.prototype.setMarkerOptions=f.prototype.h;f.prototype.setMinimumAccuracy=f.prototype.i;
    f.prototype.setPositionOptions=f.prototype.j;
    window.GeolocationMarker=f;})()

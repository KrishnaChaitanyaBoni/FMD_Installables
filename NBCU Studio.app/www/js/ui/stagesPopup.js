function stagePopOver(obj){

    var popup=obj.rel;
    
    var w = $("#pop").width(),
    h = $("#pop").height(),
    t = h/2,
    l = w/2 + 10;
    
    $("#pop").css('margin','-'+t+'px 0 0 -'+l+'px');
    $("#pop div#cont").html($(popup).html());
    $("#pop").fadeIn(300);
    
    $('body').append('<div id="mask"></div>');
    $('#mask').fadeIn(300);
    $("#pop .ourImg").css("width","230px").css("height","230px");
    return false;
   
}
$(document).ready(function(){

$('a.close').click(function() {
                   $('#mask,#pop').fadeOut(300,function() {
                                           $('#mask').remove();                                           
                                           return false;
                                           });
                   
                   });

});
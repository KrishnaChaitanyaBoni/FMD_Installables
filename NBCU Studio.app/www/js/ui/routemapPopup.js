
$(document).ready(function()
                  {

            
                  $('.mapDirection .mapDir').click(function() {
                                                   var popup=$(this).attr('rel');
                                                   $("#pop div#cont").removeClass("helpWidth");
                                                   $("#pop div#cont").addClass("dirWidth");
                                                   var w = $("#pop").width(),
                                                   h = $("#pop").height(),
                                                   t = h/2,
                                                   l = w/2 + 10;
                                                   
                                                   $("#pop").css('margin','-'+t+'px 0 0 -'+l+'px');
                                                   $("#pop div#cont").html($(popup).html());
                                                   
                                                   $("#pop").fadeIn(300);
                                                   
                                                   $('body').append('<div id="mask"></div>');
                                                   $('#mask').fadeIn(300);
                                                   $('#scrollDiv6').slimscroll();

                                                   return false;
                                                   });
                  
                  $('.mapHelp a').click(function() {
                                        var popup=$(this).attr('rel');
                                        $("#pop div#cont").removeClass("dirWidth");
                                        $("#pop div#cont").addClass("helpWidth");
                                        
                                        var w = $("#pop").width(),
                                        h = $("#pop").height(),
                                        t = h/2,
                                        l = w/2 + 10;
                                        
                                        $("#pop").css('margin','-'+t+'px 0 0 -'+l+'px');
                                        $("#pop div#cont").html($(popup).html());
                                        
                                        $("#pop").fadeIn(300);
                                        
                                        $('body').append('<div id="mask"></div>');
                                        $('#mask').fadeIn(300);
                                        
                                        return false;
                                        });
                  $('a.close').click(function() {
                                     $('#mask,#pop').fadeOut(300,function() {
                                                             $('#mask').remove();                                                            
                                                             });
                                     
                                     });
                  
                  
                  });
window.onload = function(){

            var svg = $("#yoursvg").getSVG();

            $("#yoursvg").attr('width', '800').attr('height', '1500');
            //use jquery functions to do some thing
            svg.find("g path").on('mouseout', function(event) {
              $(this).parent().children('path').attr('fill', "black");
            });
            svg.find("g path").on('mouseover', function(event) {
              event.preventDefault();
              // add text to the bottom
              $("#lanm").text($(this).attr('id'));
              //set current path color
              $(this).attr('fill', "yellow");
              $(this).siblings('path').attr('fill', "black");

              for (var i = 0; i < storeObj.length; i++) {
                if (storeObj[i].node == $(this).attr('id')*1) {

                    var toMax = 0, fromMax = 0;
                    if(storeObj[i].children.length>0){
                      for (var j = 0; j < storeObj[i].children.length; j++) {
                          if(storeObj[i].children[j].width > toMax){
                            toMax = storeObj[i].children[j].width;
                          }
                      }
                      for (var j = 0; j < storeObj[i].children.length; j++) {
                          var temp = "#" + storeObj[i].children[j].to_node;
                          svg.find(temp).attr('fill', d3.interpolateBlues((storeObj[i].children[j].width/toMax+1)/2));
                      }
                    }
                    if(storeObj[i].parents.length>0){
                      for (var j = 0; j < storeObj[i].parents.length; j++) {
                        if(storeObj[i].parents[j].width > fromMax){
                          fromMax = storeObj[i].parents[j].width
                        }
                      }

                      for (var j = 0; j < storeObj[i].parents.length; j++) {
                          var temp = "#" + storeObj[i].parents[j].from_node;
                          svg.find(temp).attr('fill', d3.interpolateReds((storeObj[i].parents[j].width/fromMax+1)/2));
                      }
                    }
                }
              }
              /* Act on the event */
            });;

        };

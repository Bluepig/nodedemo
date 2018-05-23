$(document).ready(function() {

  var arr ;
    $("#submitForm").on('click', function(event){
      event.preventDefault();
      arr = [];
      $(".liness").each(function(el){

        arr.push($(this).attr('id'));
      });

      $.ajax({
        url: '/ajax',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          lines: arr
        })
      })
      .done(function(res) {
          $("#drawingFunction").empty();
          drawdraw(res);
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("AJAX complete");
      });
    })
    $(".btn-link").on('click',function(e){
      $(this).parent().parent().parent().siblings().children().removeClass('show');
    });

    $(".btn-primary").on('click',function(e){
      var cList = $('.co22');
      $('.co11').empty();
      cList.empty();

      for (var i = 0; i < biz2data.length; i++) {
          if(biz2data[i].biz_cat2 == $(this).text()){
            for (var j = 0; j < biz2data[i].children.length; j++) {

              var li = $('<li/>')
                  .addClass('ui-menu-item')
                  .attr('role', 'menuitem')
                  .appendTo(cList);
              var aaa = $('<a/>')
                  .addClass('ui-all liness')
                  .attr('id', biz2data[i].children[j].store_id)
                  .attr('href', '#')
                  .bind( "click", clickme)
                  .text(biz2data[i].children[j].name)
                  .appendTo(li);
            }
          }
      }
    });

    function clickme(){
      $(this).removeClass('liness').addClass("linerr").unbind("click", clickme).bind("click", clickme2);;
      $(".co11").append($(this).parent().detach());
    }
    function clickme2(){
      $(this).removeClass('linerr').addClass("liness").unbind("click", clickme2).bind("click", clickme);;
      $(".co22").append($(this).parent().detach());
    }
});

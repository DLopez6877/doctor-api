$(document).ready(function() {

  $(document).on('click', '#doctors li', function() {
    var selectedObject =$(this).text();
    $('h1').each(function(i) {
      if ($(this).text() === selectedObject) {
        $(this).parent().show();
      } else {
        $(this).parent().hide();
      }
    });
  }) ;
});

$(document).ready(function() {
  $(document).on('click', '#doctors li', function() {
    var selectedObject =$(this).text();
    $('h1').each(function(i) {
      if ($(this).text() === selectedObject) {
        $('.feature').hide();
        $(this).parent().show();
        return false;
      }
    });
  });
});

$(document).ready(function() {

  $('#cta').click(function(event) {
    event.preventDefault();
    $('.main-text').fadeOut();
    $('.overlay').css('display', 'flex');
    $('#location-container').css('display', 'flex');
  });

});

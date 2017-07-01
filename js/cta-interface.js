$(document).ready(function() {

  $('#cta').click(function(event) {
    event.preventDefault();
    $('.main-text').hide();
    $('.overlay').css('display', 'flex');
    $('#location-container').css('display', 'flex');
  });

  $('.cta-close').click(function() {
    $('.main-text').show();
    $('.overlay').hide();
  });
});

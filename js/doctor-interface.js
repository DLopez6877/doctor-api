
var Search = require('./../js/doctor.js').searchModule;

$(document).ready(function() {

  $('#search-location').submit(function(event) {
    event.preventDefault();

    var city = $('#city').val();
    var state = $('#state').val();

    $('#first-name').val("");
    $('#last-name').val("");
    $('#city').val("");
    $('#state').val("");
    $('#zip').val("");

    var newSearch = new Search();
    newSearch.getLocation(city, state);
  });

});

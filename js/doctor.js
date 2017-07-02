var apiKey = require('./../.env').apiKey;

Search = function() {

};

Search.prototype.findDoctorsByIllness = function(city, state, displayResults) {
  var search = this;
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + city + state).then(function(response) {
    var lat = response.results[0].geometry.location.lat;
    var lon = response.results[0].geometry.location.lng;
    search.round(lat, lon, displayResults);
  }).fail(function(error) {
    $('#doctors').append('<li>[INVALID ADDRESS]</li>');
  });
};

Search.prototype.round = function(lat, lon, displayResults) {
  var search = this;
  var roundedLat = Math.ceil(lat * 1000) / 1000;
  var roundedLon = Math.ceil(lon * 1000) / 1000;
  search.getDoctors(roundedLat, roundedLon, displayResults);
};

Search.prototype.getDoctors = function(roundedLat, roundedLon, displayResults) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?location=' + roundedLat + '%2C' + roundedLon + '%2C100&sort=distance-asc&skip=0&limit=20&user_key=' + apiKey)
  .then(function(result) {
    displayResults(result);
  })
  .fail(function(error){
    $('#doctors').append('<li<NO MATCH -- TRY ANOTHER SEARCH</li>');
  });
};

exports.searchModule = Search;

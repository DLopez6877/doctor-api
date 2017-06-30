var apiKey = require('./../.env').apiKey;

Search = function() {

};

Search.prototype.getLocation = function(city, state) {
  var search = this;
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + city + state).then(function(response) {
    var lat = response.results[0].geometry.location.lat;
    var lon = response.results[0].geometry.location.lng;
    search.round(lat, lon);
  }).fail(function(error) {
    console.log("google fail");
  });
};

Search.prototype.round = function(lat, lon) {
  var search = this;
  var roundedLat = Math.ceil(lat * 1000) / 1000;
  var roundedLon = Math.ceil(lon * 1000) / 1000;
  search.getDoctors(roundedLat, roundedLon);
};

Search.prototype.getDoctors = function(roundedLat, roundedLon) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?location=' + roundedLat + '%2C' + roundedLon + '%2C100&sort=distance-asc&skip=0&limit=20&user_key=' + apiKey)
  .then(function(result) {
    console.log(result);
  })
  .fail(function(error){
    console.log("doctor fail");
  });
};

exports.searchModule = Search;

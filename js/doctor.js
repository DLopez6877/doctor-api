var apiKey = require('./../.env').apiKey;
var apiKeyGoogle = require('./../.env').apiKeyGoogle;

Search = function() {

};

Search.prototype.getLocation = function(city, state) {
  var search = this;
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + city + state + '&key=' + apiKeyGoogle).then(function(response) {
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
  console.log(roundedLat);
  console.log(roundedLon);
};

Search.prototype.getDoctors = function(lat, lon) {

  $.get('https://api.betterdoctor.com/2016-03-01/doctors?location=' + lat + '%' + lon + '%2C100&sort=distance-asc&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      console.log(result);
    })
   .fail(function(error){
      console.log("doctor fail");
    });
};

exports.searchModule = Search;

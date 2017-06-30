var apiKey = require('./../.env').apiKey;
var apiKeyGoogle = require('./../.env').apiKeyGoogle;

Search = function() {

};

Search.prototype.getLocation = function(city, state) {
  // $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + city + state + '&key=' + apiKey).then(function(response) {
  //   var lat = object.results[0].geometry.location.lat;
  //   var lon = object.results[0].geometry.location.lng;
  //   console.log(city, state, lat, lon);
  //   Search.getDoctors(lat, lon);
  //   console.log(response);
  // }).fail(function(error) {
  //   console.log(error);
  // });

  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + city + state + '&key=' + apiKeyGoogle).then(function(response) {
    console.log(response);
    var lat = response.results[0].geometry.location.lat;
    var lon = response.results[0].geometry.location.lng;
    console.log(city, state, lat, lon);
  }).fail(function(error) {
    console.log(error);
  });
}

Search.prototype.getDoctors = function() {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      console.log(result);
    })
   .fail(function(error){
      console.log("fail");
    });
};

exports.searchModule = Search;

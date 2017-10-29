(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Search = function() {

};

Search.prototype.findDoctorsBySymptoms = function(symptoms, city, state, displayResults) {
  var search = this;
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + city + state).then(function(response) {
    var lat = response.results[0].geometry.location.lat;
    var lon = response.results[0].geometry.location.lng;
    search.round(symptoms, lat, lon, displayResults);
  }).fail(function(error) {
    setTimeout(function() {
      $('#location-error-screen').css('display', 'flex');
    }, 2000);
  });
};

Search.prototype.round = function(symptoms, lat, lon, displayResults) {
  var search = this;
  var roundedLat = Math.ceil(lat * 1000) / 1000;
  var roundedLon = Math.ceil(lon * 1000) / 1000;
  search.getDoctors(symptoms, roundedLat, roundedLon, displayResults);
};

Search.prototype.getDoctors = function(symptoms, roundedLat, roundedLon, displayResults) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query=' + symptoms + '&location=' + roundedLat + '%2C' + roundedLon + '%2C100&sort=distance-asc&skip=0&limit=20&user_key=0ebe35eafe81bc938b29bf95f43c1e62')
  .then(function(result) {
    displayResults(result);
  })
  .fail(function(error){
    setTimeout(function() {
      $('#doctor-error-screen').css('display', 'flex');
      $('#results-container').hide();
    }, 2000);
  });
};

exports.searchModule = Search;

},{}],2:[function(require,module,exports){
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
    $(this).parent().hide();
  });

  $('.error-button').click(function() {
    $('#location-container').css('display', 'flex');
    $(this).parent().hide();
  });
});

var Search = require('./../js/doctor.js').searchModule;

var displayResults = function(result) {
  $('#doctors').empty();
  $('#appended-features').empty();
  result.data.forEach(function (i, counter) {
    $('#doctors').append('<li>' +
                          i.profile.first_name + " " + i.profile.last_name + " " + i.profile.title + '</li>');
    $('#appended-features').append('<div class="feature">' +
                                    '<h1>' + i.profile.first_name + " " + i.profile.last_name + " " + i.profile.title + '</h1>' +
                                    '<p id="description">' + i.profile.bio + '</p>' +
                                    '<p><img src="images/address.png" alt="icon"> ' + i.practices[0].visit_address.street + " " + i.practices[0].visit_address.street2 + ", " + i.practices[0].visit_address.city + ", " + i.practices[0].visit_address.state + ", " + i.practices[0].visit_address.zip + '</p>' +
                                    '<p><img src="images/phone.png" alt="icon"> ' + i.practices[0].phones[0].number + '</p>' + '<p><img src="images/gender.png" alt="icon"> ' + i.profile.gender + '</p>' +
                                    '<p>Specialties:</p>' + '<ul class="specs specs' + counter + '">' + '</ul>' + '</div>'
    );
    i.specialties.forEach(function(specialty) {
      $('.specs').last().append('<li>' + specialty.name + '</li>');
    });
  });
};

$(document).ready(function() {

  $('#search-location').submit(function(event) {
    event.preventDefault();

    var symptoms = $('#symptoms').val();
    var city = $('#city').val();
    var state = $('#state').val();

    $('#symptoms').val("");
    $('#city').val("");
    $('#state').val("");
    $('#zip').val("");

    var newSearch = new Search();
    newSearch.findDoctorsBySymptoms(symptoms, city, state, displayResults);
    $('#location-container').css('display', 'none');
    setTimeout(function() {
      if ($('#location-error-screen').css('display') === 'flex') {
      } else if ( $('#appended-features').is(':empty')) {
        $('#doctor-error-screen').css('display', 'flex');
      } else {
        $('#results-container').css('display', 'flex');
      }
    }, 7000);
  });

});

},{"./../js/doctor.js":1}]},{},[2]);

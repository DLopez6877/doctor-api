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
                                    '<p>icon* ' + i.practices[0].visit_address.street + " " + i.practices[0].visit_address.street2 + ", " + i.practices[0].visit_address.city + ", " + i.practices[0].visit_address.state + ", " + i.practices[0].visit_address.zip + '</p>' +
                                    '<p>icon*' + i.practices[0].phones[0].number + '</p>' + '<p>icon* ' + i.profile.gender + '</p>' +
                                    '<p class="lead">Specialties:</p>' + '<ul class="specs specs' + counter + '">' + '</ul>' + '</div>'
    );
    i.specialties.forEach(function(specialty) {
      $('.specs').last().append('<li>' + specialty.name + '</li>');
    });
  });
}

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
    newSearch.findDoctorsByIllness(city, state, displayResults);
    $('#location-container').css('display', 'none');
    setTimeout(function() {
      $('#results-container').css('display', 'flex');
    }, 4000);
  });

});

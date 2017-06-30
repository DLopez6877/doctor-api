var Search = require('./../js/doctor.js').searchModule;

var displayResults = function(result) {
  console.log('test');
  $('#doctors').empty();
  $('#appended-features').empty();
  result.data.forEach(function (i) {
    $('#doctors').append('<li> Dr. ' + i.profile.first_name + " " + i.profile.last_name + " " + i.profile.title);
    $('#appended-features').append('<li>hey</li>'

    );
  });
}

// <div class="feature">
//   <h1>[doctor name]</h1>
//   <p id="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
//   <p>icon* [Street] [Street2], [City], [State], [Zip]</p>
//   <p>icon* [hours]</p>
//   <p>icon* [phone]</p>
//   <p>icon* [gender]</p>
//   <p class="lead">Specialties:</p>
//   <ul>
//     <li>[specialty]</li>
//     <li>[specialty]</li>
//   </ul>
// </div>

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
    newSearch.getLocation(city, state, displayResults);
  });

});

$(document).ready(function() {
  $('#pokedex-form').submit(function(event) {
    event.preventDefault();
    var pokemonId = $('#pokemon-id').val();
    $.get('http://pokeapi.co/api/v2/pokemon/' + pokemonId + '/')
    .then(function(response) {
      console.log(response);
    }).fail(function(error) {
      console.log(error.responseJSON.message);
    });
  });
});

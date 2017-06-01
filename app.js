(function() {
  'use strict'

  angular.module('app', [])
  .component('pokemonView', {
      controller: controller,
      template: `<div class="row">
        <div class="col-xs-offset-2 col-md-8 text-center">
          <h3>Generate a random Pokemon!</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-offset-2 col-md-8 text-center blue">
          <div ng-click="$ctrl.getRandomPokemon()"><h4>Generate</h4></div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-2 col-md-8 text-center">
          <div><img ng-src="{{ $ctrl.pokemon.image }}"></div>
          <div><h4>{{ $ctrl.pokemon.name }}</h4></div>
        </div>
      </div>
`
    })

  controller.$inject = ['$http']
  function controller($http) {
    const vm = this;

    vm.$onInit = function () {
      vm.pokemon = {}
    }

    vm.getRandomPokemon = function() {
      const id = Math.floor(Math.random() * 722)
      vm.pokemon.image = 'loading_icon.gif';
      vm.pokemon.name = '';
      $http.get(`http://pokeapi.co/api/v2/pokemon/${id}/`).then(function (response) {
        console.log(response);
        vm.pokemon.image = response.data.sprites.front_default;
        let name = response.data.name;
        let nameArr = name.split('')
        nameArr[0] = nameArr[0].toUpperCase();
        name = nameArr.join('')
        vm.pokemon.name = name;
      })
    }

  }
}());

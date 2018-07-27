(function() {
  'use strict';

  angular.module('scrumboard', ['ngRoute'])
    .controller('ScrumboardController', ['$scope', '$http', '$location', 'Login', ScrumboardController]);

    function ScrumboardController($scope, $http, $location, Login) {

      Login.redirectIfNotLoggedIn();
      $scope.user = JSON.parse(Login.currentUser())
      $scope.logout = Login.logout;
      $scope.data = [];
      $http.get('/scrumboard_api/lists/').then(function(response) {
        $scope.data = response.data;
      });

      $scope.add = function(list, title) {
        if(title === undefined) {
          return;
        }

        var card = { title: title, list: list.id };
        $http.post('/scrumboard_api/cards/', card)
          .then(function(response) {
            list.cards.push(response.data);
          },
          function() {
            alert("Could not create card!")
          });
      };
    }
}());

(function () {
  'use strict';

  angular.module('scrumboard')
    .directive('scrumboardCard', CardDirective);

  function CardDirective() {
    return {
      templateUrl: '/static/html/card.html',
      restrict: 'E', // Use this as an html element
      controller: ['$scope', '$http', function($scope, $http) {
        var url = '/scrumboard_api/cards/' + $scope.card.id + '/';
        $scope.update = function() {
          $http.put(
            url,
            $scope.card
          );
        };

        $scope.delete = function() {
          $http.delete(url).then(
            function() {
              var cards = $scope.list.cards;
              cards.splice(cards.indexOf($scope.card), 1)
            }
          )
        }

        $scope.modelOptions = {
          debounce: 1000
        };
      }]
    };
  }
})();

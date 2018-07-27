(function () {
  'use strict';

  angular.module('scrumboard')
    .config(['$routeProvider', config])
    .run(['$http', run]);

  // Configure Angular Routes
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/static/html/scrumboard.html',
        controller: 'ScrumboardController',
      })
      .when('/login', {
        templateUrl: '/static/html/login.html',
        controller: 'LoginController',
      })
      .otherwise('/');
  }

  // CSRF Token that Django expects when making API calls
  // This gets called for every REST call
  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
  }
})();

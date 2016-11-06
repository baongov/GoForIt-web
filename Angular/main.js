'use strict';

/**
 * @Created by ngovietbao on November 6th
 * @name GoForIt
 * Main module of the application.
 */
var main = angular.module('mainModule', []);

//Routing Configuration (define routes)
main.config([
    '$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider,$rootScope) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'Index.html',
                controller: 'MainController'
            })
     }
});


angular.module('psJwtApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/views/home.html'
        })

        .state('register', {
            url: '/register',
            templateUrl: '/views/register.html',
            controller: 'RegisterCtrl'
        });

    $urlRouterProvider.otherwise('/');
});
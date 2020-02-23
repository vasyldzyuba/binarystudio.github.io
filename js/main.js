 let app = angular.module('app', ['ngRoute']);
 app.config(function ($routeProvider) {
 	$routeProvider.when('/', {
 		templateUrl: '/todo.html',
 		controller: 'todoCtrl',
 		controllerAs: 'todo'
 	})
 })

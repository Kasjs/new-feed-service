'use strict';

var rssReaderApp = angular.module('rssReaderApp', ['ui.router']);

rssReaderApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('view-list', {
		url:'/view-list',
		templateUrl:'templates/view-list.html'
	})
	.state('view-grid', {
		url:'/view-grid',
		templateUrl:'templates/view-grid.html'
	})
	.state('view-card', {
		url:'/view-card',
		templateUrl:'templates/view-card.html'
	})

}])

//News feed controller
rssReaderApp.controller('FeedList', ['$scope', '$http', '$location', function($scope, $http, $location){	
	$scope.titleList = 'hello-list';
	
	$http.get('news.json').then(function(responce){			
		$scope.news = responce.data;		
	});

}])

//Single page controller
rssReaderApp.controller('SingleNews', ['', function(){
	
}])
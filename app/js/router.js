'use strict';

var ReaderApp = angular.module('ReaderApp', ['ui.router']);

ReaderApp.config(['$stateProvider', '$urlRouterProvider',  function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/dashboard');
	$stateProvider
	.state('view-list', {
		url:'/view-list?cat',
        views: {
            "":{
                templateUrl:'templates/view-list.html',
                controller:'FeedListCtrl'
            },
            'feed-controls@view-list':{
                templateUrl:'templates/feed-controls.html',
                controller: 'FeedLayoutCtrl'
            }
        }
	})
	.state('view-grid', {
		url:'/view-grid?cat',
        views: {
            "":{
                templateUrl:'templates/view-grid.html',
                controller:'FeedListCtrl'
            },
            'feed-controls@view-grid':{
                templateUrl:'templates/feed-controls.html',
                controller: 'FeedLayoutCtrl'
            }
        }
	})
	.state('view-card', {
		url:'/view-card?cat',
        views: {
            "":{
                templateUrl:'templates/view-card.html',
                controller:'FeedListCtrl'
            },
            'feed-controls@view-card':{
                templateUrl:'templates/feed-controls.html',
                controller: 'FeedLayoutCtrl'
            }
        }
	})
    .state('dashboard', {
		url:'/dashboard',
		templateUrl:'dashboard.html',
		controller: 'DashboardCtrl'
	})
	.state('singleView', {
		url:'/?cat&entry',
		templateUrl:'single.html',
		controller: 'SingleNewsCtrl'
	})

}])

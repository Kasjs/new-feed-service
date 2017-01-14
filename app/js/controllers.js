'use strict';

//News feed controller
ReaderApp.controller('FeedLayoutCtrl', ['$scope','$stateParams','$location','feedService', function($scope, $stateParams,$location, feedService){
    $scope.category = $stateParams.cat;

    // $scope.removeFeedById = function(){
    //     //console.log('sadf');
    //     feedService.removeFeedById($scope.category);
    //     $location.path('dashboard');
    // }

}])

//News feed controller
ReaderApp.controller('FeedListCtrl', ['$scope','$stateParams', 'feedService', function($scope, $stateParams, feedService){

    $scope.category = $stateParams.cat;
    var feed  = feedService.getFeedById($stateParams.cat);
    if(feed.length != 0){
        $scope.news = feed.entries;
        //console.log($scope.news);
    }
}])

//Single page controller
ReaderApp.controller('SingleNewsCtrl', ['$scope','$stateParams','feedService', function($scope, $stateParams, feedService){
    console.log($stateParams);
    var entry = feedService.getFeedEntryById($stateParams.cat, $stateParams.entry);
    if(entry.length != 0){
        $scope.single = entry;
        //console.log(entry);
    }
}])

//Sidebar page controller
ReaderApp.controller('SidebarCtrl', ['$scope','$rootScope', 'feedService', function($scope, $rootScope, feedService){
    $scope.titles = [];
    $rootScope.$on('data_shared',function(){
        $scope.titles = feedService.getCategoryArray();
    })
}])

//Dashboard page controller
ReaderApp.controller('DashboardCtrl', ['$scope', '$rootScope', '$location', 'feedService', function($scope, $rootScope, $location, feedService){
    $scope.feed = '';
    $scope.getFeedArticle = function() {
        feedService.getParsedFeed($scope.feedLink)
            .then(function(responce){
                feedService.addFeedToCategoryList($scope.feedCategory, responce);
        });
    }

}])

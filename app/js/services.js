ReaderApp.factory('feedService', ['$http', '$rootScope',  function($http, $rootScope) {
    var categories = [/*
    	{
    	categoryName: "News",
    	categoryFeeds: [ {id:0, title:'test'}, {id:0, title:'test'} ]
    	}
    */];
        feeds = [],
        feedCounter = 0;

    function getParsedFeed(url) {
        return $http.post('/getParsedFeed', {url: url}).then(function(responce) {
            console.log(responce.data);
            return responce.data;
        });
        // return $http.jsonp('https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url))
        //     .then(function(response) {
        //         return response.data;
        // });
        //
    }

    function addFeedToCategoryList(categoryName, feedItem){

        var categoryIndex = categories.findIndex(function(item){
            return item.categoryName == categoryName;
        });

        if(categoryIndex != -1){
            var currFeed = categories[categoryIndex].categoryFeeds;
            var feedIndex = currFeed.findIndex(function(item){
                return item.feedTitle == feedItem.title;
            });
            //console.log(feed, feedIndex, feedItem.title);
            if(feedIndex == -1){
                currFeed.push({
                    feedId:feedCounter,
                    feedTitle:feedItem.title,
                });
                feeds.push({
                    feedKey:feedCounter,
                    entries:feedItem.entries
                });
            }
            /*categories.push({
                categoryName: categoryName,
                categoryFeeds: categoryName,
            })*/

        } else {
            var currFeeds = [];
            currFeeds.push({
                feedId:feedCounter,
                feedTitle:feedItem.title,
            });

            categories.push({
                categoryName: categoryName,
                categoryFeeds: currFeeds,
            });

            feeds.push({
                feedKey:feedCounter,
                entries:feedItem.entries
            });
        }
        feedCounter++;
        console.log(categories, feedCounter, feeds);
        $rootScope.$broadcast('data_shared');
    }

    function getCategoryArray(){
        return categories;
    }

    function getFeedById(id){
        var feed = null;
        feeds.forEach(function(item){
            if(item.feedKey == id){
                feed = item;
            }
        });
        return feed;
    }

    function getFeedEntryById(feedId, entryId){
        var entry = feeds[feedId].entries[entryId];
        return entry;
    }
// +++do not put unused function
    function removeFeedById(feedId){
        categories.forEach(function(item, i, arr){
            var cat = item.categoryFeeds;
            cat.splice(feedId,1);
        });

        feeds.splice(feedId, 1);
        //console.log(feeds, feedId, categories);
        //$rootScope.$broadcast('data_shared');
    }

    return {
        getParsedFeed         : getParsedFeed,
        addFeedToCategoryList : addFeedToCategoryList,
        getCategoryArray      : getCategoryArray,
        getFeedById           : getFeedById,
        getFeedEntryById      : getFeedEntryById,
        //+++ please correct format code
        removeFeedById : removeFeedById
    }
}])

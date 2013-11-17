'use strict';

angular.module('iutubeApp')
  .controller('MainCtrl', function ($scope, YtPlayer, YtTool, ApiUrl) {

    $scope.videos = {};
    $scope.autorepeat = true;
    $scope.filters = [
      {"name":"Relevance", "value":"relevance"},
      {"name":"Published", "value":"published"},
      {"name":"Rating", "value":"rating"},
      {"name":"Total Views", "value":"viewCount"}
    ];
    $scope.filter = $scope.filters[0];

    $scope.$on('ApiReady',function () {
      ApiUrl.set("https://gdata.youtube.com/feeds/api/videos/");
      YtPlayer.playerId = "ytplayer";
      YtPlayer.loadPlayer();
      YtPlayer.autorepeat = $scope.autorepeat;
    });

    $scope.load = function(videoId){
      if(videoId) {
        YtPlayer.videoId = videoId;
        YtPlayer.loadVideo();
        return;
      }

      if($scope.videoUrl !== undefined) {
        var videoId = YtTool.parseUrl($scope.videoUrl);
        if(videoId !== "") {
          YtPlayer.videoId = videoId;
          YtPlayer.loadVideo();
        }
        else {
          alert("Invalid Url");
        }
      }
      else {
        alert("Invalid Url");
      }
    }

    $scope.search = function() {
      if($scope.keyword !== undefined) {
        YtTool.search.filter = $scope.filter.value;
        YtTool.search.keyword = $scope.keyword;
        YtTool.searchVideo(function(data){
          $scope.videos = data;
        });
      }
    }

    $scope.testChange = function() {
      console.log("Set AutoRepeat to: " + $scope.autorepeat);
      YtPlayer.autorepeat = $scope.autorepeat;
    }
  });

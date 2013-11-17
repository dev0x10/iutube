/**
 * Created by yauriedogawa on 11/16/13.
 */
angular.module('iutubeApp')
  .factory('YtPlayer', function ($window, $rootScope) {

    var youtubePlayer = {"playerId": null,
      "playerObj": null,
      "height": 390,
      "width": 640,
      "videoId": "",
      "autorepeat": true};

    //Event listeners
    $window.onYouTubeIframeAPIReady = function () {
      $rootScope.$broadcast('ApiReady');
      console.log("OnYouTubeIframeAPIReady");
    };

    $window.onPlayerReady = function () {
      console.log("OnPlayerReady");
    }

    $window.onPlayerStateChange = function (event) {
      console.log("OnPlayerStateChange");
      if (event.data == YT.PlayerState.PLAYING) {
        console.log("Playing");
      }
      else if(event.data == YT.PlayerState.ENDED) {
        console.log("AutoRepeat is " + youtubePlayer.autorepeat);
        if(youtubePlayer.autorepeat){
          youtubePlayer.playerObj.loadVideoById(youtubePlayer.videoId);
        }
      }
    }

    youtubePlayer.setPlayerId = function (elemId) {
      this.playerId = elemId;
    };

    youtubePlayer.loadVideo = function () {
      youtubePlayer.playerObj.loadVideoById(this.videoId);
    }

    youtubePlayer.loadPlayer = function () {
      this.playerObj = new YT.Player(this.playerId, {
        height: this.height,
        width: this.width,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    };
    return youtubePlayer;
  })
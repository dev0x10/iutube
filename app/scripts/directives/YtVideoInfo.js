/**
 * Created by yauriedogawa on 11/16/13.
 */
angular.module("iutubeApp")
  .directive("ytVideoInfo", function () {
    return {
      restrict: "EA",
      templateUrl: "templates/YtVideoInfo.html"
    };
  });

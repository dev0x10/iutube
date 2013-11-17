/**
 * Created by yauriedogawa on 11/16/13.
 */
angular.module('iutubeApp')
  .factory('YtTool', function ($http, ApiUrl) {

    var youtubeTool = {
      search : {
        filter: "relevance",
        keyword: ""
      }
    };

    youtubeTool.parseUrl = function (url) {
      var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[1].length == 11) {
        return match[1];
      } else {
        return "";
      }
    }

    youtubeTool.searchVideo = function (callback) {
      var query = ApiUrl.get().concat("?v=2&alt=jsonc&orderby=",this.search.filter,"&q=", this.search.keyword);
      $http.get(query)
        .success(function (data, status, headers, config) {
          if (status == 200) {
            callback(data.data.items);
          }
          else {
            callback(status);
          }
        })
        .error(function (response, status, headers, config) {
          callback(response);
        });
    }

    return youtubeTool;
  });
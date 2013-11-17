/**
 * Created by yauriedogawa on 11/16/13.
 */
angular.module("iutubeApp")
  .service("ApiUrl", function(){
    var apiUrl = "";
    return {
      get: function () {
        return apiUrl;
      },
      set: function(value) {
        apiUrl = value;
      }
    };
  })
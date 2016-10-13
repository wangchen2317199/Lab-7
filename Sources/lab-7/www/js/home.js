$(document).ready(
	function() {
	    angular.module('home');
		var apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=bd5aab124fd7b84656a32cc5b35f98e9&per_page=10&format=json&nojsoncallback=1";
		$.getJSON(
			apiurl,
			function(result) {
				var id = result["photos"]["photo"][0]["id"];
				var secret = result["photos"]["photo"][0]["secret"];
				var server = result["photos"]["photo"][0]["server"];
				var farm = result["photos"]["photo"][0]["farm"];
				var photoUrl = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_q.jpg)"
				$.getJSON(
					"https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=8c51475419e3809dbe98da396f76a1ce681b59ca&url=" + photoUrl + "&version=2016-05-19",
					function(result2) {
						var tag = result2["images"][0]["classifiers"][0]["classes"][0]["class"];
						$("#result").replaceWith("<div id = 'result'><img src = '" + photoUrl + "'></img><p>" + tag + "</p></div>");
					}
				);
			}
		);
	}
);
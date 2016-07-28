/*
 * CORS = Cross-Origin Resource Sharing
 *
 * It is insecure to allow a webpage to request any resources from any other domains without limitation. CORS (Cross-Origin Resource Sharing) is a system that determines whether to block or fulfill these requests.
 *
 */
var CORS = CORS || {
	
    createCORSRequest: function(method, url) {
		var xhr = new XMLHttpRequest();
		
		xhr.crossDomain = true;
		
		if ("withCredentials" in xhr) {
			// Check if the XMLHttpRequest object has a "withCredentials" property.
			// "withCredentials" only exists on XMLHTTPRequest2 objects.
			xhr.open(method, url, true);

		} else if (typeof XDomainRequest != "undefined") {
			// Otherwise, check if XDomainRequest.
			// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
			xhr = new XDomainRequest();
			xhr.open(method, url);

		} else {
			// Otherwise, CORS is not supported by the browser.
			xhr = null;
			console.log("CORS is not supported.");
		}
		
		xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,PUT,POST");
		xhr.setRequestHeader("Access-Control-Allow-Headers", "X-Requested-With");
		xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
		xhr.setRequestHeader("Content-Type", "text/plain");
		
		return xhr;
	},
    
    sendCORSRequest: function (xhr, objCallbacks /* {onload:, onerror: }*/ ) {
        //var xhr = createCORSRequest('GET', url);

        if (!xhr) {
            //throw new Error('CORS not supported');
            console.log("CORS not supported.");
        }

        xhr.onload = objCallbacks.onload;

        /*
        xhr.onload = function() {
            var responseText = xhr.responseText;

            if (responseText === undefined || responseText === "" || responseText.length === 0) {
                alert("Server action incomplete.");
                return; // Nothing to do here since we don't have the right data.
            }

            responseText = JSON.parse(xhr.responseText); // Array

        };
        */

        xhr.onerror = function(msg) {
            console.log('Error: ' + JSON.stringify(msg) );
            // Make sure permissions in manifest.json has the correct domains to perform a CORS request.
        };


      try {
        xhr.send();
      } catch (e) {
        console.log("AJAX fail: " + e.message);
      }
    }
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    // DEBUG:
    //console.log("Content script: Received message with request " + request.method );
    
    switch ( request.method ) 
    {
    
        // CONTENT SCRIPT - TEXT SELECTION SEED (EVENT LISTENER) << MESSAGE OUTBOUND >>
        // ------------------------------------
        case "getSelection":
            //console.log("Processing: " + request.method);
            
            // Credit: http://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
            var text = "";
            if (window.getSelection) {
                text = window.getSelection().toString();
            } else if (document.selection && document.selection.type != "Control") {
                text = document.selection.createRange().text;
            }
            
            text = text.replace(/\./g,""); // Filter text selection to prevent 404 error page.
            
            //console.log("Text Selected(" + text.length + "): " + text);
            sendResponse({method:"searchSelectedText", data: text});

        break;
            
    default:
        console.log("Method is invalid: " + request.method);
    }
    
});


// PAGE EVENTS
// ------------------
document.addEventListener("DOMContentLoaded", function(event) {

  });

document.addEventListener("load", function(event) {

  });
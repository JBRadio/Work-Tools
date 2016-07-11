/*
 * JAVASCRIPT behind Work Tools Browser-action Google Chrome Extension
 * https://github.com/JBRadio/<Insert>
 *
 *
 * Work Tools Extension
 *  - On Extension load:               
 *
 * Use of Chrome Storage
    - User preference for theme and extension window size
    - Last search word with/out Advanced Search Options
 *
 *
 * BUGS / ISSUES
   - It appears the (click) event handlers should be removed when a page is removed from view. They add up and errors messages duplicate. Also the back button could be triggered twice which results in the page being loaded again... somehow.
 */

// Global Variables
// ----------------




// --------------------------
// Application Initialization (When extension opens)
// --------------------------

// Document is only built once, use the .ready() to do things on the initial page
$(document).ready(function () {
    setTimeout( function(){
        $($('.ui-page-active form :input:visible')[0]).focus();
    }, 500);

});


// -------------
// jQuery Mobile
// -------------

$(document).on('pageshow', function() {
    var activePageId = $( ":mobile-pagecontainer" ).pagecontainer('getActivePage')[0].id;
    //console.log("Active Page ID: " + activePageId); // DEBUG:
    
    if ( activePageId == undefined ) {
        console.log("pagecontainer getActivePage is undefined.");
        return;
    }
    
    switch ( activePageId ) {
        case "index":
            // Setting focus makes the scrollbar jump to the top where the search filter is
            // Either scroll to the top and focus() to feel natural or remove it.
            //$('html, body').animate({scrollTop : 0},800);
            //setTimeout( function(){ $($('.ui-page-active form :input:visible')[0]).focus(); }, 500);
            break;
            
        case "ToolPage":
            if ( WorkTool.loadedTool.pageshow !== undefined && WorkTool.loadedTool.pageshow !== null )
                setTimeout( function(){ WorkTool.loadedTool.pageshow(); }, 500);
            break;
    }
});

$(document).on('pageinit', '#index', function() { // Initialize #index; Only happens once.

    // 1.) Set up <ul> with tools <li>
    // -------------------------------
    $('#ulMainList').empty();
    var toolList = "";
    var toolCategory = [];
    var toolsByCategory = [];
    
    for ( var i = 0; i < WorkTool.Tools.length; i++ ) {
        
        // #.) Make a category name in case we forgot to do this
        if ( WorkTool.Tools[i].category == undefined )
            WorkTool.Tools[i].category = "uncategorized"; 
        
        // #.) See if we have the category in the toolCategory array and create it if not
        if ( $.inArray(WorkTool.Tools[i].category, toolCategory) == -1 )
            toolCategory.push( WorkTool.Tools[i].category );
        
        // #.) See if we have a toolsByCategory array, if not create it
        if ( toolsByCategory[WorkTool.Tools[i].category] == undefined )
            toolsByCategory[WorkTool.Tools[i].category] = [];
        
        // #.) See if we have a tool name, if so push tool to toolsByCategory array
        if ( WorkTool.Tools[i].name == undefined )
            WorkTool.Tools[i].name = "Unknown";
        
        toolsByCategory[WorkTool.Tools[i].category].push(WorkTool.Tools[i].name);
    }
    
    toolCategory.sort();
    
    for (var i = 0; i < toolCategory.length; i++) {
        toolList += '<li data-role="list-divider" data-theme="d">' + toolCategory[i] + '</li>';
        toolsByCategory[toolCategory[i]].sort();
        
        for (var x = 0; x < toolsByCategory[toolCategory[i]].length; x++)
        {
            toolList += '<li><a href="">' + toolsByCategory[toolCategory[i]][x] + '</a></li>';
        }
    }
    
    
    $('#ulMainList').html(toolList);
    $('#ulMainList').listview('refresh'); // do not use .enhanceWithin();
    
    
    // 2.) Set up Event Listeners for #index <li> items
    // ------------------------------------------------
    $('#index li').map( function(number, element) {
        $(element).on('click', function (){
            if ( this.children && this.children.length > 1 )
                return console.log("Cannot process more than child in <li>"); // Use dialog
            else if ( this.children && this.children.length > 0 )
                WorkTool.Page(this.children[0].innerHTML); // If <a>, get innerHTML of that
            else
                WorkTool.Page(this.innerHTML); 
        });
    });
});

/*
$(document).on('pagebeforecreate',function(){console.log('pagebeforecreate');});
$(document).on('pagecreate',function(){console.log('pagecreate');});
$(document).on('pageinit',function(){console.log('pageinit');});
$(document).on('pagebeforehide',function(){console.log('pagebeforehide');});
$(document).on('pagebeforeshow',function(){console.log('pagebeforeshow');});
$(document).on('pageremove',function(){console.log('pageremove');});
$(document).on('pageshow',function(){console.log('pageshow');});
$(document).on('pagehide',function(){console.log('pagehide');});
$(window).load(function () {console.log("window loaded");});
$(window).unload(function () {console.log("window unloaded");});
$(function () {console.log('document ready');});
*/
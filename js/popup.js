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
 * Dark/Jisho Yoake Theme modified from https://userstyles.org/styles/115621/jisho (see css file)
 *
 * BUGS / ISSUES
   - It appears the (click) event handlers should be removed when a page is removed from view. They add up and errors messages duplicate. Also the back button could be triggered twice which results in the page being loaded again... somehow.
 */

// Global Variables
// ----------------

var WorkTool = WorkTool || {
    
    // List of tools that are compatible with this Mobile Web Application; See Tool JS file
    // Tools should have a unique name
    Tools: [], 
    addToolToTools: function(tool) { this.Tools.push(tool); },
    haveToolByName: function(toolName) {
        var haveTool = "Not Found";
        for (var i = 0; i < this.Tools.length; i++) {
            if ( WorkTool.Tools[i].name == toolName ) {
                haveTool = i;
                break;
            }
        }
        return haveTool;
    },
    loadedTool: {}, // avoid loading the same tool twice or doing extra work
    
    PageTemplate: function(tool) {
        
        // tagName: div
        // attributes: {'data-role':'page', 'data-position':'fixed', ... }
        // classes: ['colorRed', 'big', ...]
        // inlineStyle: {'color':'red', ...}
        // childObjects: [{child1}, {child2}]
        // childStrings: ['<div>...</div>', '<span>...</span>]
        //  - Cannot have childObjects and childStrings
        // innerHtml: 'Inside HTML or text'
        
        // Decide later if a Tool should maintain its own footer
        var footer = {tagName:'div', 
                      attributes: {'data-role':"footer", 'data-position':'fixed'},
                      innerHTML: tool.footer == undefined ? "" : tool.footer};
        
        /*var content = {tagName:'div', 
                      attributes: {data-role:'content'},
                      innerHTML: tool.content != undefined ? tool.content : ""};
        */
        
        var btnBack = {tagName:'a',
                       attributes: {href:'#index', 'data-icon':'back'},
                       innerHTML: 'back'};
        
        var header = {tagName:'div', 
                      attributes: {'data-role':"header"},
                      childObjects: [btnBack,
                                     {tagName:'h1', 
                                      innerHTML: tool.header != undefined ? tool.header : ""}]
                     };
        
        var page = HtmlBuilder.buildHtmlString( {tagName:'div', 
                    attributes: {'data-role':"page", 'data-position':'fixed', id:'ToolPage'},
                    childObjects: [header, tool.content(), footer]} );

        return page;
    },
    
    Page: function (toolName) {
        
		// Confirm we have new tool to load
        var toolIndex = WorkTool.haveToolByName(toolName); // Returns a # or "Not Found"
        
        if ( toolIndex == "Not Found") { // 0 (zero) also evaluates to false; Screws with array index return value
            // DEBUG:
			console.log("Page: Failed to load tool " + toolName);
            return false;
        }   
        
		// Set up variables
        var tool = WorkTool.Tools[toolIndex];
		var newPage = "", page = "", header = "", content = "", footer = "", description = "";
		
		// Process
        if ( WorkTool.loadedTool.name == undefined ) { // Never loaded a tool before; Build tool page (jQuery Mobile)
		
            // DEBUG:
			//console.log('Page: building page for tool: ' + toolName);
            
            newPage = $( WorkTool.PageTemplate(tool) ); 
            newPage.appendTo( $.mobile.pageContainer ); // Build Page
            WorkTool.loadedTool = tool; 				// Append for jQuery Mobile
            WorkTool.loadedTool.events(); 				// Add click handlers
            $.mobile.changePage( newPage ); 			// Change view to Tool page
                
		} else if (WorkTool.loadedTool.name != toolName) { // New tool after first to load; Overwrite existing jQuery Mobile page container
		
			// DEBUG:
			//console.log('New tool (' + toolName + ') is different than loaded tool (' + WorkTool.loadedTool.name + ')' );
			
			// Unhook event handlers from old tool page (call tool method)
			// Build new jQuery Mobile page container - everything under the <div data-role="page" ...>
			// Replace innerHTML of <div data-role="page" ...>
			// Update loaded tool to new tool
			// Change page to altered #ToolPage (hopefully enhanced on pagecreate/pageshow)
			
			//console.log('New page data: ' + WorkTool.EverythingUnderPageTemplate(tool));
			
			$('#ToolPage').empty(); 		// Remove contents (supposed to remove event listeners)
			newPage = $('#ToolPage').html(WorkTool.EverythingUnderPageTemplate(tool));
			$('#ToolPage').enhanceWithin(); // Update with jQuery Mobile enhancement code
			WorkTool.loadedTool = tool;
            WorkTool.loadedTool.events(); 				// Add click handlers
			$.mobile.changePage( $('#ToolPage') );
            
        } else { // Same tool is being loaded; Do not make any changes.
            // Do not do much since we are reloading the previously loaded tool.
            // Should tools have a reset or can the previous values stay?
			// console.log('Loaded tool (' + WorkTool.loadedTool.name + ') is the same as new tool (' + toolName + '). Make no changes. Change page.');
            $.mobile.changePage( $('#ToolPage') );
        }
        
    },
    
    EverythingUnderPageTemplate: function(tool) {
        
        var footer = HtmlBuilder.buildHtmlString( {tagName:'div', 
                      attributes: {'data-role':"footer", 'data-position':'fixed'},
                      innerHTML: tool.footer != undefined ? tool.footer : ""} );
        
        var content = HtmlBuilder.buildHtmlString( tool.content() );
        
        var btnBack = {tagName:'a',
                       attributes: {href:'#index', 'data-icon':'back'},
                       innerHTML: 'back'};
        
        var header = HtmlBuilder.buildHtmlString( {tagName:'div', 
                      attributes: {'data-role':"header"},
                      childObjects: [btnBack,
                                     {tagName:'h1', 
                                      innerHTML: tool.header != undefined ? tool.header : ""}]
                     } );
        
        return (header + content + footer);
                
    }, // End of ToolTemplate
    
}


// --------------------------
// Application Initialization (When extension opens)
// --------------------------

$(document).ready(function () {
    
    setTimeout( function(){
        $($('.ui-page-active form :input:visible')[0]).focus();
    }, 500);

});



// -------------
// jQuery Mobile
// -------------

$(document).on('pageinit', '#index', function() { // Initialize #index; Only happens once.
		
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
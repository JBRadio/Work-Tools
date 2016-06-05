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
    
    /*PageTemplate: function(pageName, txtHeader, txtContent, txtFooter) {
        return ('<div data-role="page" data-position="fixed" id="page' + pageName + '">'
                + '<div data-role="header">'
                + '<a href="#index" data-icon="back">Back</a>'
                + txtHeader + '</div>'
                + '<div data-role="content">' + txtContent + '</div>'
                + '<div data-role="footer" data-position="fixed">' + txtFooter + '</div>'
                + '</div>');
    },*/
    
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
        
        var toolIndex = WorkTool.haveToolByName(toolName); // Returns a # or "Not Found"
        
        if ( toolIndex == "Not Found") { // 0 (zero) also evaluates to false; Screws with array index return value
            console.log("Page: Failed to load tool " + toolName);
            return false;
        }   
        
        var tool = WorkTool.Tools[toolIndex];
        
        if ( WorkTool.loadedTool.name == undefined || this.loadedTool.name != toolName ) {
            // Load the new tool page / Overwrite current loaded tool
            console.log('Page: building or overwriting page for tool: ' + toolName);
            
            if ( document.getElementById('ToolPage') == null ) 
            { // Build page and append to pageContainer
                console.log('Page: Building new page for jQuery Mobile for tool: ' + toolName);
                var newPage = "";
                var page = "", header = "", content = "", footer = "", description = "";
            
            newPage = $( WorkTool.PageTemplate(tool) ); 
            newPage.appendTo( $.mobile.pageContainer ); // Build Page
            WorkTool.loadedTool = tool; // Append for jQuery Mobile
            WorkTool.loadedTool.events(); // Add click handlers
            $.mobile.changePage( newPage ); // Change view to Tool page
                
            } else { // Overwrite existing page container
                console.log('#ToolPage found: Overwriting page details for tool: ' + tool );
                // Modify to be everything under the <div data-role="page" ...>
                // Replace innerHTML of <div data-role="page" ...>
                newPage = $('#ToolPage').html(WorkTool.EverythingUnderPageTemplate(tool)); 
                // Change page to altered #ToolPage (hopefully enhanced on pagecreate/pageshow)
                $.mobile.changePage( $('#ToolPage') );
            }
            
        } else {
            // Do not do much since we are reloading the previously loaded tool.
            // Should tools have a reset or can the previous values stay?
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

$(document).on('pageshow', '#index', function() {
        //alert( $('#index li').length );
        $('#index li').map( function(number, element) {
            $(element).on('click', function(){
                if ( this.children && this.children.length > 1 )
                    return console.log("Cannot process more than child in <li>"); // Use dialog
                else if ( this.children && this.children.length > 0 )
                    WorkTool.Page(this.children[0].innerHTML); // If <a>, get innerHTML of that
                else
                    WorkTool.Page(this.innerHTML);
            });
        });
    });
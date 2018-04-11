var ToolCodeTroubleshooting = ToolCodeTroubleshooting || {
    
    name: 'Code Troubleshooting/Forums',
    category: 'Code',
    description: 'Display links to free online sites that help with troubleshooting. This is not a complete list of websites. Feel free to search online for more sites. To test code, please check out the Code Playground links or use the browser console in web development.',
    header: 'Code Troubleshooting/Forums', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolCodeTroubleshooting.description};
        
        // Forums
        var listForumHeader = {tagName: 'h2', innerHTML: 'Forums'};
        var listForumItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['CodeCall', 'http://forum.codecall.net/'],
            ['Code Guru', 'http://forums.codeguru.com/'],
            ['Code Project', 'http://www.codeproject.com/'],
            ['DevShed', 'http://forums.devshed.com/'],
            ['Google+ Communities', 'https://plus.google.com/communities'],
            ['Reddit (r/Programming)', 'https://www.reddit.com/r/programming'],
            ['SitePoint', 'https://www.sitepoint.com/community/'],
            ['Stack Overflow', 'http://stackoverflow.com/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listForum = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listForumItems, {tagName: 'li'} )};
        
        
        
        // See Also
        // --------
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also:'};
        var seeAlsoItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Minification (programming)', 'https://en.wikipedia.org/wiki/Minification_(programming)']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
    
        var seeAlso = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( seeAlsoItems, {tagName: 'li'} )};
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br,
                                     listForumHeader, listForum
                                     //seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    events: function() {
        
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolCodeTroubleshooting);
//console.log(WorkTool.Tools);
//console.log('ToolCodeTroubleshooting.js: ' + HtmlBuilder.buildHtmlString( ToolCodeTroubleshooting.content() ) );
var ToolWeb = ToolWeb || {
    
    name: 'Web Development Tools',
    category: 'Web Development',
    description: 'Display links to free online sites that will allow you to learn or do more with web development.',
    header: 'Web Development Tools', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolWeb.description};
         
        // HTML Tool Sites
        // ---------------
        var listHtmlSitesHeader = {tagName: 'h2', innerHTML: 'HTML Tool Websites'};
        var listHtmlSites = HtmlBuilder.buildHtmlLinkList([
            ['TextFixer.com: Online HTML Tools', 'http://www.textfixer.com/html/']
            //['name','href'],
            ]);
        
        // CSS Theme
        var listCssThemeHeader = {tagName: 'h2', innerHTML: 'CSS Themes'};
        var listCssTheme = HtmlBuilder.buildHtmlLinkList([
            ['jQuery Mobile ThemeRoller', 'http://themeroller.jquerymobile.com/?']
            //['name','href'],
            ]);
        
        
        // See Also
        // --------
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also:'};
        var seeAlsoItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var seeAlso = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( seeAlsoItems, {tagName: 'li'} )};
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br,
                                     listHtmlSitesHeader, listHtmlSites,
                                     listCssThemeHeader, listCssTheme,
                                     seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    events: function() {
        
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolWeb);
//console.log(WorkTool.Tools);
//console.log('ToolWeb.js: ' + HtmlBuilder.buildHtmlString( ToolWeb.content() ) );
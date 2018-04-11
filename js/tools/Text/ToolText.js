var ToolText = ToolText || {
    
    name: 'Text Tools',
    category: 'Text',
    description: 'Display links to free online sites that will allow you to perform functions on text or strings.',
    header: 'Text Tools', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolText.description};
         
        
        // Text Tool Sites
        // ---------------
        var listTextSitesHeader = {tagName: 'h2', innerHTML: 'Text Tool Websites'};
        var listTextSites = HtmlBuilder.buildHtmlLinkList([
            ['String-Functions.com', 'http://string-functions.com/'],
            ['Text Fixer', 'http://www.textfixer.com/tools/']
            //['name','href'],
            ]);
        
        // Numbers
        
        // Random
        var listRandomHeader = {tagName: 'h2', innerHTML: 'Random Tools'};
        var listRandom = HtmlBuilder.buildHtmlLinkList([
            ['Random.org', 'https://www.random.org/']
            //['name','href'],
            ]);
        
        // Regular Expressions
        var listREHeader = {tagName: 'h2', innerHTML: 'Regular Expression'};
        var listRE = HtmlBuilder.buildHtmlLinkList([
            ['RegExr: Learn, Build, & Test RegEx', 'http://regexr.com/']
            //['name','href'],
            ]);
        
        // Time
        var listTimeHeader = {tagName: 'h2', innerHTML: 'Time and Date'};
        var listTime = HtmlBuilder.buildHtmlLinkList([
            ['Time and Date.com', 'http://www.timeanddate.com/']
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
                                     listTextSitesHeader, listTextSites,
                                     listRandomHeader, listRandom,
                                     listREHeader, listRE,
                                     listTimeHeader, listTime,
                                     seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    events: function() {
        
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolText);
//console.log(WorkTool.Tools);
//console.log('ToolText.js: ' + HtmlBuilder.buildHtmlString( ToolText.content() ) );
var ToolDataJsonToStructure = ToolDataJsonToStructure || {
    
    name: 'JSON Data to ...',
    category: 'Data',
    description: 'Display links.',
    header: 'JSON Data to ...', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        var hr = {tagName: 'hr'};
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolDataJsonToStructure.description};
        
        // Convert to JSON
        var convertToJSONHeader = '<h2>Convert to JSON</h2>';
        var convertToJSON = HtmlBuilder.buildHtmlLinkList([
            ['XML to JSON', 'http://www.convertcsv.com/yaml-to-csv.htm']
        ]);
            
        
        // Convert from JSON
        var convertFromJSONHeader = '<h2>Convert from JSON</h2>';
        var convertFromJSON = HtmlBuilder.buildHtmlLinkList([
            ['JSON to XML', 'http://www.convertcsv.com/yaml-to-csv.htm']
        ]);
        
        // See Also
        // --------
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also:'};
        var seeAlso = HtmlBuilder.buildHtmlLinkList([
            //['name','href'],
            ]);
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [//descHeader, 
                                     descInfo, br,
                                     convertFromJSONHeader, convertFromJSON,
                                     convertToJSONHeader, convertToJSON,
                                     seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    pageshow: function() {
    },
    
    events: function() {
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolDataJsonToStructure);
//console.log(WorkTool.Tools);
//console.log('ToolDataJsonToStructure.js: ' + HtmlBuilder.buildHtmlString( ToolDataJsonToStructure.content() ) );
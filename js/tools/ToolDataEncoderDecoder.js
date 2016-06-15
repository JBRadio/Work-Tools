var ToolEncoderDecoder = ToolEncoderDecoder || {
    
    name: 'Data Encoder/Decoder',
    description: 'Display links to free online sites that will allow you to encode/decode.',
    header: 'Data Encoder/Decoder', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolEncoderDecoder.description};
        
        // Base64
        // ------
        var listHeaderBase64 = {tagName: 'h2', innerHTML: 'Base64'};
        var listItemsBase64 = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Base64 Converter', 'http://www.webtoolkitonline.com/base64-converter.html']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listBase64 = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listItemsBase64, {tagName: 'li'} )};
        
        // URL Encoder / Decoder
        // ---------------------
        var listURLHeader = {tagName: 'h2', innerHTML: 'URL Encoder/Decoder'};
        var listURLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['URL Encoder / Decoder', 'http://www.webtoolkitonline.com/url-encoder-decoder.html']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listURL = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listURLItems, {tagName: 'li'} )};
        
        
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
                                     //listCSSHeader, listCSS,
                                     listHeaderBase64, listBase64,
                                     listURLHeader, listURL,
                                     seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    events: function() {
        
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolEncoderDecoder);
//console.log(WorkTool.Tools);
//console.log('ToolEncoderDecoder.js: ' + HtmlBuilder.buildHtmlString( ToolEncoderDecoder.content() ) );
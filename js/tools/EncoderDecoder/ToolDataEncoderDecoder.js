var ToolEncoderDecoder = ToolEncoderDecoder || {
    
    name: 'Data Encoder/Decoder',
    category: 'Encode/Decode',
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
            ['Base64 Converter', 'http://www.webtoolkitonline.com/base64-converter.html'],
            ['Base64-Encode A String', 'http://string-functions.com/base64encode.aspx'],
            ['Base64-Decode A String', 'http://string-functions.com/base64decode.aspx']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listBase64 = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listItemsBase64, {tagName: 'li'} )};
        
        // Character Encoder / Decoder
        // ---------------------------
        var listCharHeader = {tagName: 'h2', innerHTML: 'Character Encoder/Decoder'};
        var listChar = HtmlBuilder.buildHtmlLinkList([
            ['Character Encoder / Decoder', 'http://string-functions.com/encodedecode.aspx'],
            ['Character Encoding Errors Analyzer', 'http://string-functions.com/encodingerror.aspx'],
            ['Character Encoding Table Index', 'http://string-functions.com/encodingindex.aspx']
            //['name','href'],
            ]);
        
        // Device Codes
        // ------------
        var listDeviceHeader = {tagName: 'h2', innerHTML: 'Device-related'};
        var listDevice = HtmlBuilder.buildHtmlLinkList([
            ['EBCDIC', 'http://www.lookuptables.com/ebcdic_scancodes.php'],
            ['IBM Scan Codes', 'http://www.lookuptables.com/ebcdic_scancodes.php']
            //['name','href'],
            ]);
        
        // HTML Encoder / Decoder
        // ----------------------
        var listHTMLHeader = {tagName: 'h2', innerHTML: 'HTML Encoder/Decoder'};
        var listHTML = HtmlBuilder.buildHtmlLinkList([
            ['HTML-Decode A String', 'http://string-functions.com/htmldecode.aspx'],
            ['HTML-Encode A String', 'http://string-functions.com/htmlencode.aspx'],
            ['HTML Symbol Entities Reference', 'http://www.ascii-code.com/html-symbol.php']
            //['name','href'],
            ]);
        
        // URL Encoder / Decoder
        // ---------------------
        var listURLHeader = {tagName: 'h2', innerHTML: 'URL Encoder/Decoder'};
        var listURLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['URL Encoder / Decoder', 'http://www.webtoolkitonline.com/url-encoder-decoder.html'],
            ['URL-Encode A String', 'http://string-functions.com/urlencode.aspx'],
            ['URL-Decode A String', 'http://string-functions.com/urldecode.aspx']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listURL = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listURLItems, {tagName: 'li'} )};
        
        
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
                                     //listCSSHeader, listCSS,
                                     listCharHeader, listChar,
                                     listHeaderBase64, listBase64,
                                     listHTMLHeader, listHTML,
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
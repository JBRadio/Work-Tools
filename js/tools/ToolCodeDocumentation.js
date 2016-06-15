var ToolCodeDocumentation = ToolCodeDocumentation || {
    
    name: 'Code Documentation and Tutorials',
    category: 'Code',
    description: 'Display links to free online sites that will allow you to learn about programming languages or API. This is not a complete list of websites. Feel free to search online for more sites.',
    header: 'Code Documentation and Tutorials', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolCodeDocumentation.description};
        
        // Searchable Documentation Sites
        // ------------------------------
        var listSearchHeader = {tagName: 'h2', innerHTML: 'Searchable Documentation - Multiple'};
        var listSearchItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['DevDocs API Documentation', 'http://devdocs.io/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listSearch = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listSearchItems, {tagName: 'li'} )};
        
        // CSS (Formatter, Optimizer, Compression)
        // ---
        var listCSSHeader = {tagName: 'h2', innerHTML: 'CSS'};
        var listCSSItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['CSS | MDN - Mozilla Developer Network', 'https://developer.mozilla.org/en-US/docs/Web/CSS'],
            ['CSS Tutorial (w3schools.com)', 'http://www.w3schools.com/css/default.asp']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listCSS = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listCSSItems, {tagName: 'li'} )};
        
        // Google Apps Script
        // ------------------
        var listGASHeader = {tagName: 'h2', innerHTML: 'Google Apps Script'};
        var listGASItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Overview of Google Apps Script (google.com)', 'https://developers.google.com/apps-script/overview'],
            ['Tutorials (google.com)'], ['https://developers.google.com/apps-script/articles']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listGAS = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listGASItems, {tagName: 'li'} )};
        
        // Javascript
        // ----------
        var listJSHeader = {tagName: 'h2', innerHTML: 'JavaScript'};
        var listJSItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['JavaScript | MDN - Mozilla Developer Network', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
            ['JavaScript Tutorial (w3schools.com)', 'http://www.w3schools.com/js/default.asp']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listJS = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listJSItems, {tagName: 'li'} )};
        
        // JSON (Javascript Object Notation)
        // ----
        var listJSONHeader = {tagName: 'h2', innerHTML: 'JSON'};
        var listJSONItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['JSON', 'http://www.json.org/'],
            ['JSON Tutorial (w3schools.com)', 'http://www.w3schools.com/json/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listJSON = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listJSONItems, {tagName: 'li'} )};
        
        // JSON-LD (Javascript Object Notation Linked Data)
        // ----
        var listJSONLDHeader = {tagName: 'h2', innerHTML: 'JSON-LD (Linked Data)'};
        var listJSONLDItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['JSON-LD', 'http://json-ld.org/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listJSONLD = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listJSONLDItems, {tagName: 'li'} )};
        
        // HTML
        // ----
        var listHTMLHeader = {tagName: 'h2', innerHTML: 'HTML'};
        var listHTMLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['HTML(5) Tutorial (w3schools.com)', 'http://www.w3schools.com/html/default.asp'],
            ['HTML | MDN - Mozilla Developer Network' , 'https://developer.mozilla.org/en-US/docs/Web/HTML']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listHTML = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listHTMLItems, {tagName: 'li'} )};
        
        // Regular Expression
        // http://www.webtoolkitonline.com/regular-expression-tester.html
        
        // PHP
        // ---
        var listPHPHeader = {tagName: 'h2', innerHTML: 'PHP'};
        var listPHPItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['PHP Tutorial (w3schools.com)', 'http://www.w3schools.com/php/default.asp']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
        var listPHP = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listPHPItems, {tagName: 'li'} )};
        
        // SQL (Structured Query Syntax)
        // ---
        var listSQLHeader = {tagName: 'h2', innerHTML: 'SQL'};
        var listSQLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['SQL Tutorial (w3schools.com)', 'http://www.w3schools.com/sql/default.asp']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
        var listSQL = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listSQLItems, {tagName: 'li'} )};
        
        // XML
        // ---
        var listXMLHeader = {tagName: 'h2', innerHTML: 'XML'};
        var listXMLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['XML Tutorial (w3schools.com)', 'http://www.w3schools.com/xml/default.asp']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
    
        var listXML = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listXMLItems, {tagName: 'li'} )};
        
        // XPATH
        // http://www.webtoolkitonline.com/xml-xpath-tester.html
        
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
                                     listSearchHeader, listSearch,
                                     listCSSHeader, listCSS,
                                     listGASHeader, listGAS,
                                     listHTMLHeader, listHTML,
                                     listJSHeader, listJS,
                                     listJSONHeader, listJSON,
                                     listJSONLDHeader, listJSONLD,
                                     listPHPHeader, listPHP,
                                     listSQLHeader, listSQL,
                                     listXMLHeader, listXML,
                                     seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    events: function() {
        
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolCodeDocumentation);
//console.log(WorkTool.Tools);
//console.log('ToolCodeDocumentation.js: ' + HtmlBuilder.buildHtmlString( ToolCodeDocumentation.content() ) );
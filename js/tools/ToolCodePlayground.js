var ToolCodePlayground = ToolCodePlayground || {
    
    name: 'Code Tester/Playground',
    category: 'Code',
    description: 'Display links to free online sites that will allow you to test or play with code. This is not a complete list of websites. Feel free to search online for more sites.',
    header: 'Code Tester/Playground', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolCodePlayground.description};
        
        // Web (HTML/CSS/JS)
        var listWebHeader = {tagName: 'h2', innerHTML: 'HTML/CSS/JS'};
        var listWebItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Bootsnipp - Design elements, playground and code snippets for Bootstrap HTML/CSS/JS framework', 'http://bootsnipp.com/'],
            ['Fiddle Salad', 'http://fiddlesalad.com/css/'],
            ['JS Fiddle', 'https://jsfiddle.net/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listWeb = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listWebItems, {tagName: 'li'} )};
        
        
        // CSS (Formatter, Optimizer, Compression)
        // ---
        var listCSSHeader = {tagName: 'h2', innerHTML: 'CSS'};
        var listCSSItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['CSS Lint', 'http://csslint.net/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listCSS = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listCSSItems, {tagName: 'li'} )};
        
        
        // Javascript
        // ----------
        var listJSHeader = {tagName: 'h2', innerHTML: 'JavaScript'};
        var listJSItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['JavaScript Tester', 'http://www.webtoolkitonline.com/javascript-tester.html'],
            ['JS Hint', 'http://jshint.com/'],
            ['JS Lint', 'http://www.jslint.com/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listJS = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listJSItems, {tagName: 'li'} )};
        
        // JSON (Javascript Object Notation)
        // ----
        var listJSONHeader = {tagName: 'h2', innerHTML: 'JSON'};
        var listJSONItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['JSONLint', 'http://jsonlint.com/'],
            ['JSON Tester', 'http://www.webtoolkitonline.com/json-tester.html']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listJSON = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listJSONItems, {tagName: 'li'} )};
        
        // JSON-LD (Javascript Object Notation Linked Data)
        // ----
        var listJSONLDHeader = {tagName: 'h2', innerHTML: 'JSON-LD (Linked Data)'};
        var listJSONLDItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['JSON-LD Playground', 'http://json-ld.org/playground/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listJSONLD = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listJSONLDItems, {tagName: 'li'} )};
        
        // HTML
        // ----
        var listHTMLHeader = {tagName: 'h2', innerHTML: 'HTML'};
        var listHTMLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Real-time HTML Editor', 'http://htmledit.squarefree.com/']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listHTML = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listHTMLItems, {tagName: 'li'} )};
        
        // Python
        // ------
        var listPythonHeader = {tagName: 'h2', innerHTML: 'Python'};
        var listPythonItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Pythex: a Python regular expression editor', 'http://pythex.org/'],
            ['Python Fiddle', 'http://pythonfiddle.com/']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listPython = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listPythonItems, {tagName: 'li'} )};
        
        // Regular Expression
        // http://www.webtoolkitonline.com/regular-expression-tester.html
        
        // SQL (Structured Query Syntax)
        // ---
        var listSQLHeader = {tagName: 'h2', innerHTML: 'SQL'};
        var listSQLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['SQL Fiddle', 'http://sqlfiddle.com/']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
        var listSQL = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listSQLItems, {tagName: 'li'} )};
        
        // XML
        // ---
        var listXMLHeader = {tagName: 'h2', innerHTML: 'XML'};
        var listXMLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['XML Tester', 'http://www.webtoolkitonline.com/xml-tester.html']
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
                                     listWebHeader, listWeb,
                                     listCSSHeader, listCSS,
                                     listHTMLHeader, listHTML,
                                     listJSHeader, listJS,
                                     listJSONHeader, listJSON,
                                     listJSONLDHeader, listJSONLD,
                                     listPythonHeader, listPython,
                                     listSQLHeader, listSQL,
                                     listXMLHeader, listXML,
                                     seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    events: function() {
        
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolCodePlayground);
//console.log(WorkTool.Tools);
//console.log('ToolCodePlayground.js: ' + HtmlBuilder.buildHtmlString( ToolCodePlayground.content() ) );
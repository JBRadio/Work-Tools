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
        
        // Multiple
        var listMultipleHeader = {tagName: 'h2', innerHTML: 'Playground for Multiple Languages'};
        var listMultiple = HtmlBuilder.buildHtmlLinkList([
            ['Coding Ground', 'http://www.tutorialspoint.com/codingground.htm']
            //['name','href'],
            ]);
        
        // Web (HTML/CSS/JS)
        var listWebHeader = {tagName: 'h2', innerHTML: 'HTML/CSS/JS'};    
        var listWeb = HtmlBuilder.buildHtmlLinkList([
            ['Bootsnipp - Design elements, playground and code snippets for Bootstrap HTML/CSS/JS framework', 'http://bootsnipp.com/'],
            ['Fiddle Salad', 'http://fiddlesalad.com/css/'],
            ['JS Fiddle', 'https://jsfiddle.net/']
            //['name','href'],
            ]);
        
        // CSS (Formatter, Optimizer, Compression)
        // ---
        var listCSSHeader = {tagName: 'h2', innerHTML: 'CSS'};        
        var listCSS = HtmlBuilder.buildHtmlLinkList([
            ['CSS Lint', 'http://csslint.net/'],
            ['W3C CSS Validation Service', 'http://jigsaw.w3.org/css-validator/']
            //['name','href'],
            ]);
        
        // Javascript
        // ----------
        var listJSHeader = {tagName: 'h2', innerHTML: 'JavaScript'};        
        var listJS = HtmlBuilder.buildHtmlLinkList([
            ['JavaScript Tester', 'http://www.webtoolkitonline.com/javascript-tester.html'],
            ['JS Hint', 'http://jshint.com/'],
            ['JS Lint', 'http://www.jslint.com/']
            //['name','href'],
            ]);
        
        // JSON (Javascript Object Notation)
        // ----
        var listJSONHeader = {tagName: 'h2', innerHTML: 'JSON'};
        var listJSON = HtmlBuilder.buildHtmlLinkList([
            ['JSONLint', 'http://jsonlint.com/'],
            ['JSON Tester', 'http://www.webtoolkitonline.com/json-tester.html']
            //['name','href'],
            ]);
        
        // JSON-LD (Javascript Object Notation Linked Data)
        // ----
        var listJSONLDHeader = {tagName: 'h2', innerHTML: 'JSON-LD (Linked Data)'};
        var listJSONLD = HtmlBuilder.buildHtmlLinkList([
            ['JSON-LD Playground', 'http://json-ld.org/playground/']
            //['name','href'],
            ]);
        
        // HTML
        // ----
        var listHTMLHeader = {tagName: 'h2', innerHTML: 'HTML'};
        var listHTML = HtmlBuilder.buildHtmlLinkList([
            ['Real-time HTML Editor', 'http://htmledit.squarefree.com/'],
            ['W3C Markup Validation Service', 'https://validator.w3.org/']
            //['name','href'],
            ]);
        
        // Mobile
        // ------
        var listMobileHeader = {tagName: 'h2', innerHTML: 'Mobile'};
        var listMobile = HtmlBuilder.buildHtmlLinkList([
            ['W3C mobileOK Checker', 'https://validator.w3.org/mobile/']
            //['name','href'],
            ]);
        
        // Python
        // ------
        var listPythonHeader = {tagName: 'h2', innerHTML: 'Python'};
        var listPython = HtmlBuilder.buildHtmlLinkList([
            ['Pythex: a Python regular expression editor', 'http://pythex.org/'],
            ['Python Fiddle', 'http://pythonfiddle.com/']
            //['name','href'],
            ]);
        
        // Regular Expression
        // http://www.webtoolkitonline.com/regular-expression-tester.html
        
        // SQL (Structured Query Syntax)
        // ---
        var listSQLHeader = {tagName: 'h2', innerHTML: 'SQL'};
        var listSQL = HtmlBuilder.buildHtmlLinkList([
            ['SQL Fiddle', 'http://sqlfiddle.com/']
            //['name','href'],
            ]);
        
        // XML
        // ---
        var listXMLHeader = {tagName: 'h2', innerHTML: 'XML'};
        var listXML = HtmlBuilder.buildHtmlLinkList([
            ['XML Tester', 'http://www.webtoolkitonline.com/xml-tester.html']
            //['name','href'],
            ]);
        
        // XPATH
        // http://www.webtoolkitonline.com/xml-xpath-tester.html
        
        // See Also
        // --------
        var seeAlsoHeader = {tagName: 'h2', innerHTML: 'See Also:'};
        var seeAlso = HtmlBuilder.buildHtmlLinkList([
            //['name','href'],
            ]);
        
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br,
                                     listMultipleHeader, listMultiple,
                                     listWebHeader, listWeb,
                                     listCSSHeader, listCSS,
                                     listHTMLHeader, listHTML,
                                     listJSHeader, listJS,
                                     listJSONHeader, listJSON,
                                     listJSONLDHeader, listJSONLD,
                                     listMobileHeader, listMobile,
                                     listPythonHeader, listPython,
                                     listSQLHeader, listSQL,
                                     listXMLHeader, listXML,
                                     //seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    events: function() {
        
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolCodePlayground);
//console.log(WorkTool.Tools);
//console.log('ToolCodePlayground.js: ' + HtmlBuilder.buildHtmlString( ToolCodePlayground.content() ) );
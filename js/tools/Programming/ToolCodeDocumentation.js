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
        var listSearch = HtmlBuilder.buildHtmlLinkList([
            ['DevDocs API Documentation', 'http://devdocs.io/']
            //['name','href'],
            ]);
        
        // CSS (Formatter, Optimizer, Compression)
        // ---
        var listCSSHeader = {tagName: 'h2', innerHTML: 'CSS'};
        var listCSS = HtmlBuilder.buildHtmlLinkList([
            ['CSS | MDN - Mozilla Developer Network', 'https://developer.mozilla.org/en-US/docs/Web/CSS'],
            ['CSS Tutorial (w3schools.com)', 'http://www.w3schools.com/css/default.asp'],
            ['CSS (tutorialspark.com)', 'http://www.tutorialspark.com/css3/index.php']
            //['name','href'],
            ]);
        
        // Google Apps Script
        // ------------------
        var listGASHeader = {tagName: 'h2', innerHTML: 'Google Apps Script'};
        var listGAS = HtmlBuilder.buildHtmlLinkList([
            ['Overview of Google Apps Script (google.com)', 'https://developers.google.com/apps-script/overview'],
            ['Tutorials (google.com)'], ['https://developers.google.com/apps-script/articles']
            //['name','href'],
            ]);
        
        // Javascript
        // ----------
        var listJSHeader = {tagName: 'h2', innerHTML: 'JavaScript'};
        var listJS = HtmlBuilder.buildHtmlLinkList([
            ['JavaScript | MDN - Mozilla Developer Network', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
            ['JavaScript Tutorial (w3schools.com)', 'http://www.w3schools.com/js/default.asp'],
            ['JavaScript Tutorial (tutorialspoint.com)', 'http://www.tutorialspoint.com/javascript/index.htm'],
            ['JavaScript (tutorialspark.com)', 'http://www.tutorialspark.com/javascript/index.php'],
            ['AJAX Tutorial (w3schools.com)', 'http://www.w3schools.com/ajax/default.asp']
            //['name','href'],
            ]);
        
        // JSON (Javascript Object Notation)
        // ----
        var listJSONHeader = {tagName: 'h2', innerHTML: 'JSON'};
        var listJSON = HtmlBuilder.buildHtmlLinkList([
            ['JSON', 'http://www.json.org/'],
            ['JSON Tutorial (w3schools.com)', 'http://www.w3schools.com/json/']
            //['name','href'],
            ]);
        
        // JSON-LD (Javascript Object Notation Linked Data)
        // ----
        var listJSONLDHeader = {tagName: 'h2', innerHTML: 'JSON-LD (Linked Data)'};
        var listJSONLD = HtmlBuilder.buildHtmlLinkList([
            ['JSON-LD', 'http://json-ld.org/']
            //['name','href'],
            ]);
        
        // jQuery
        // ------
        http://www.tutorialspark.com/jquery/index.php
        var listJQUERYHeader = {tagName: 'h2', innerHTML: 'jQuery'};
        var listJQUERY = HtmlBuilder.buildHtmlLinkList([
            ['jQuery (jquery.com)', 'https://jquery.com/'],
            ['jQuery (tutorialspark.com)', 'http://www.tutorialspark.com/jquery/index.php'],
            ['jQuery Quick API Reference', 'https://oscarotero.com/jquery/'],
            ['jQuery Tutorial (tutorialspoint.com)', 'http://www.tutorialspoint.com/jquery/'],
            ['jQuery Tutorials (w3schools.com)', 'http://www.w3schools.com/jquery/'],
            ['jQuery Mobile (jquerymobile.com)', 'http://jquerymobile.com/'],
            ['jQuery Mobile Tutorial (tutorialspoint.com)', 'http://www.tutorialspoint.com/jquery_mobile/index.htm'],
            ['jQuery Mobile Tutorials (w3schools.com)', 'http://www.w3schools.com/jquerymobile/default.asp'],
            ['jQuery UI (jqueryui.com)', 'http://jqueryui.com/'],
            ['jQuery UI Tutorial (tutorialspoint.com)', 'http://www.tutorialspoint.com/jqueryui/index.htm'],
            ['QUnit (qunitjs.com)', 'http://qunitjs.com/']
            //['name','href'],
            ]);
        
        // HTML
        // ----
        var listHTMLHeader = {tagName: 'h2', innerHTML: 'HTML'};    
        var listHTML = HtmlBuilder.buildHtmlLinkList([
            ['HTML(5) Tutorial (w3schools.com)', 'http://www.w3schools.com/html/default.asp'],
            ['HTML | MDN - Mozilla Developer Network' , 'https://developer.mozilla.org/en-US/docs/Web/HTML'],
            ['HTML5 (tutorialspark.com)', 'http://www.tutorialspark.com/html5/index.php']
            //['name','href'],
            ]);
        
        // Regular Expression
        // http://www.webtoolkitonline.com/regular-expression-tester.html
        
        // PHP
        // ---
        var listPHPHeader = {tagName: 'h2', innerHTML: 'PHP'};
        var listPHP = HtmlBuilder.buildHtmlLinkList([
            ['PHP Tutorial (w3schools.com)', 'http://www.w3schools.com/php/default.asp'],
            ['PHP Tutorial (tutorialspoint.com)', 'http://www.tutorialspoint.com/php/index.htm'],
            ['PHP 7 Tutorial (tutorialspoint.com)', 'http://www.tutorialspoint.com/php7/index.htm']
            //['name','href'],
            ]);
        
        
        // SQL (Structured Query Syntax)
        // ---
        var listSQLHeader = {tagName: 'h2', innerHTML: 'SQL'};
        var listSQL = HtmlBuilder.buildHtmlLinkList([
            ['SQL Tutorial (w3schools.com)', 'http://www.w3schools.com/sql/default.asp']
            //['name','href'],
            ]);
        
        // XML
        // ---
        var listXMLHeader = {tagName: 'h2', innerHTML: 'XML'};
        var listXML = HtmlBuilder.buildHtmlLinkList([
            ['DTD Tutorial (tutorialspoint.com)', 'http://www.tutorialspoint.com/dtd/index.htm'],
            ['XML Tutorial (w3schools.com)', 'http://www.w3schools.com/xml/default.asp'],
            ['XML DOM Tutorial (tutorialspoint.com)', 'http://www.tutorialspoint.com/dom/index.htm'],
            ['XPATH Tutorial (tutorialspoint.com)', 'http://www.tutorialspoint.com/xpath/index.htm']
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
                                     listSearchHeader, listSearch,
                                     listCSSHeader, listCSS,
                                     listGASHeader, listGAS,
                                     listHTMLHeader, listHTML,
                                     listJSHeader, listJS,
                                     listJSONHeader, listJSON,
                                     listJSONLDHeader, listJSONLD,
                                     listJQUERYHeader, listJQUERY,
                                     listPHPHeader, listPHP,
                                     listSQLHeader, listSQL,
                                     listXMLHeader, listXML,
                                     //seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    events: function() {
        
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolCodeDocumentation);
//console.log(WorkTool.Tools);
//console.log('ToolCodeDocumentation.js: ' + HtmlBuilder.buildHtmlString( ToolCodeDocumentation.content() ) );
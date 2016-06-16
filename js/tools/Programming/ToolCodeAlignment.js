var ToolCodeAlignment = ToolCodeAlignment || {
    
    name: 'Code Alignment/Formatting',
    category: 'Code',
    description: 'Display links to free online sites that will align code.',
    header: 'Code Alignment/Formatting', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolCodeAlignment.description};
        
        // CSS (Formatter, Optimizer, Compression)
        // ---
        var listCSSHeader = {tagName: 'h2', innerHTML: 'CSS'};
        var listCSSItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['CSS Beautifier (cleancss.com)', 'http://www.cleancss.com/css-beautify/'],
            ['CSS Beautifier (html.fwpolice.com)', 'http://html.fwpolice.com/css/'],
            ['CSS Beautifier (minifycode.com)', 'http://minifycode.com/css-beautifier/'],
            ['CSS Beautify And Minify', 'http://codebeautify.org/css-beautify-minify'],
            ['Code Beautifier', 'http://www.codebeautifier.com/'],
            ['Online CSS Formatter', 'http://www.tutorialspoint.com/online_css_formatter.htm'],
            ['ProCSSr', 'http://tools.maxcdn.com/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listCSS = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listCSSItems, {tagName: 'li'} )};
        
        
        // Javascript
        // ----------
        var listJSHeader = {tagName: 'h2', innerHTML: 'JavaScript'};
        var listJSItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['JavaScript Beautifier (jsbeautifier.org)', 'http://jsbeautifier.org/'],
            ['JavaScript Beautifier (danstools.com)', 'http://www.danstools.com/javascript-beautify/'],
            ['JavaScript Beautifier (javascriptbeautifier.com)', 'http://javascriptbeautifier.com/'],
            ['JavaScript Beautifier (minifycode.com)', 'http://minifycode.com/javascript-beautifier/'],
            ['JavaScript Viewer', 'http://codebeautify.org/jsviewer'],
            ['Online Javascript Formatter', 'http://www.tutorialspoint.com/online_javascript_formatter.htm']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listJS = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listJSItems, {tagName: 'li'} )};
        
        // JSON (Javascript Object Notation)
        // ----
        var listJSONHeader = {tagName: 'h2', innerHTML: 'JSON'};
        var listJSONItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Online JSON Editor', 'http://www.tutorialspoint.com/online_json_editor.htm'],
            ['JSON Beautifier/Formatter', 'http://www.cleancss.com/json-beautify/'],
            ['JSON Formatter (jsonformat.com)', 'http://jsonformat.com/'],
            ['JSON Formatter (freeformatter.com)', 'http://www.freeformatter.com/json-formatter.html']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listJSON = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listJSONItems, {tagName: 'li'} )};
        
        // HTML
        // ----
        var listHTMLHeader = {tagName: 'h2', innerHTML: 'HTML'};
        var listHTMLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['HTML Beautifier (beautifytools.com)', 'http://beautifytools.com/html-beautifier.php'],
            ['HTML Beautifier (minifycode.com)', 'http://minifycode.com/html-beautifier/'],
            ['HTML Format', 'http://jsonformat.com/html'],
            ['HTML Formatter (freeformatter.com)', 'http://www.freeformatter.com/html-formatter.html'],
            ['HTML Formatter (cleancss.com)', 'http://www.cleancss.com/html-beautify/']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listHTML = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listHTMLItems, {tagName: 'li'} )};
        
        // Python
        // ------
        var listPythonHeader = {tagName: 'h2', innerHTML: 'Python'};
        var listPythonItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Python Beautify', 'http://www.cleancss.com/python-beautify/']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listPython = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listPythonItems, {tagName: 'li'} )};
        
        
        // SQL (Structured Query Syntax)
        // ---
        var listSQLHeader = {tagName: 'h2', innerHTML: 'SQL'};
        var listSQLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Instant SQL Formatter', 'http://www.dpriver.com/pp/sqlformat.htm'],
            ['Online SQL Formatter', 'http://www.tutorialspoint.com/online_sql_formatter.htm'],
            ['SQLLint', 'http://sqllint.com/'],
            ['SQL Formatter (sql-format.com)', 'http://www.sql-format.com/'],
            ['SQL Formatter (freeformatter.com)', 'http://www.freeformatter.com/sql-formatter.html'],
            ['SQL (MySQL) Beautify', 'http://www.cleancss.com/sql-beautify/']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
        var listSQL = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listSQLItems, {tagName: 'li'} )};
        
        // XML
        // ---
        var listXMLHeader = {tagName: 'h2', innerHTML: 'XML'};
        var listXMLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Online XML Editor', 'http://www.tutorialspoint.com/online_xml_editor.htm'],
            ['XML Formatter (freeformatter.com)', 'http://www.freeformatter.com/xml-formatter.html'],
            ['XML Formatter (cleancss.com)', 'http://www.cleancss.com/xml-beautify/']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
    
        var listXML = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listXMLItems, {tagName: 'li'} )};
        
        // Others
        // ------
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br,
                                     listCSSHeader, listCSS,
                                     listHTMLHeader, listHTML,
                                     listJSHeader, listJS,
                                     listJSONHeader, listJSON,
                                     listPythonHeader, listPython,
                                     listSQLHeader, listSQL,
                                     listXMLHeader, listXML
                                    ]};
        return content;
    }, // End of content
    
    events: function() {
        
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolCodeAlignment);
//console.log(WorkTool.Tools);
//console.log('ToolCodeAlignment.js: ' + HtmlBuilder.buildHtmlString( ToolCodeAlignment.content() ) );
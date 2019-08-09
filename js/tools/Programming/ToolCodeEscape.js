var ToolCodeEscape = ToolCodeEscape || {
    
    name: 'Code Escaping',
    category: 'Code',
    description: 'Display links to free online sites that will explain escaping or is a tool to show encoded/decoded escape code.',
    header: 'Code Escaping', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolCodeAlignment.description};
        
        var searchLi = [], tempLi;
        
        // Multiple
        // --------
        /*
        var listMultipleHeader = '<h2>Multiple Language Formatter</h2>';
        var listMultiple = HtmlBuilder.buildHtmlLinkList([
            ['Pretty Printer', 'http://prettyprinter.de/']
            //['name','href'],
            ]);
        */    
        
        // AutoHotkey
        var listAHKHeader = {tagName: 'h2', innerHTML:'AHK'};
        var listAHKItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['AHK #EscapeChar', 'https://www.autohotkey.com/docs/commands/_EscapeChar.htm']
            ],
            {attributes: {target:'blank'}}
        );
             
        var listAHK = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listAHKItems, {tagName: 'li'} )};
            
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listAHKItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'HTML'});
        searchLi = searchLi.concat(tempLi);
        
        // CSS (Formatter, Optimizer, Compression)
        // ---
        var listCSSHeader = {tagName: 'h2', innerHTML: 'CSS'};
        var listCSSItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['CSS character escape sequences by @Mathias', 'https://mathiasbynens.be/notes/css-escapes'],
            ['CSS Escapes tool by @Mathias', 'https://mothereff.in/css-escapes'],
            ['CSS.escape()', 'https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listCSS = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listCSSItems, {tagName: 'li'} )};
        
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listCSSItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'CSS'});
        searchLi = searchLi.concat(tempLi);
        
        
        // Javascript
        // ----------
        var listJSHeader = {tagName: 'h2', innerHTML: 'JavaScript'};
        var listJSItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['JS escape()', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/escape'],
            ['JS unescape()', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/unescape']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listJS = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listJSItems, {tagName: 'li'} )};
        
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listJSItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'JavaScript'});
        searchLi = searchLi.concat(tempLi);
        
        
        // JSON (Javascript Object Notation)
        // ----
        var listJSONHeader = {tagName: 'h2', innerHTML: 'JSON'};
        var listJSONItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['JSON String Escape / Unescape (FreeFormatter.com)', 'https://www.freeformatter.com/json-escape.html']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listJSON = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listJSONItems, {tagName: 'li'} )};
        
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listJSONItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'JSON'});
        searchLi = searchLi.concat(tempLi);
        
        
        // HTML
        // ----
        var listHTMLHeader = {tagName: 'h2', innerHTML: 'HTML'};
        var listHTMLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['HTML Escape / Unescape (freeformatter.com)', 'https://www.freeformatter.com/html-escape.html']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listHTML = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listHTMLItems, {tagName: 'li'} )};
        
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listHTMLItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'HTML'});
        searchLi = searchLi.concat(tempLi);
        
        /*
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
        
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listPythonItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'Python'});
        searchLi = searchLi.concat(tempLi);
        
        
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
        
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listSQLItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'SQL'});
        searchLi = searchLi.concat(tempLi);
        
        
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
        
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listXMLItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'XML'});
        searchLi = searchLi.concat(tempLi);
        */
        
        // Others
        // ------
        
        var searchUl = {tagName:'ul', 
                      attributes:{'data-role':'listview', 'data-inset':'true', 'data-filter':'true'}, 
                      childObjects:searchLi};
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br,
                                     //listMultipleHeader, listMultiple, br,
                                     searchUl,
                                     //listCSSHeader, listCSS, 
                                     //listHTMLHeader, listHTML,
                                     //listJSHeader, listJS,
                                     //listJSONHeader, listJSON,
                                     //listPythonHeader, listPython,
                                     //listSQLHeader, listSQL,
                                     //listXMLHeader, listXML
                                    ]};
        return content;
    }, // End of content
    
    pageshow: function() {
        document.getElementsByTagName('input')[1].focus(); // 0 = main page's searchbar
    },
    
    events: function() {
        
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolCodeEscape);
//console.log(WorkTool.Tools);
//console.log('ToolCodeEscape.js: ' + HtmlBuilder.buildHtmlString( ToolCodeEscape.content() ) );
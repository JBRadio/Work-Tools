var ToolCodeMinify = ToolCodeMinify || {
    
    name: 'Code Minify/Compression',
    category: 'Code',
    description: 'Display links to free online sites that will minify or compress code.',
    header: 'Code Minify/Compression', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolCodeMinify.description};
        
        // CSS (Formatter, Optimizer, Compression)
        // ---
        var listCSSHeader = {tagName: 'h2', innerHTML: 'CSS'};
        var listCSSItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['CSS Minifier (cleancss.com)', 'http://www.cleancss.com/css-minify/'],
            ['CSS Minifier (freeformatter.com)', 'http://www.freeformatter.com/css-minifier.html'],
            ['CSS Minifier (cssminifier.com)', 'https://cssminifier.com/'],
            ['CSS Minifier (webtoolkitonline.com)', 'http://www.webtoolkitonline.com/css-minifier.html'],
            ['Minify - JavaScript and CSS minifier', 'http://www.minifier.org/'],
            ['Online CSS Minifier', 'http://www.tutorialspoint.com/online_css_minifier.htm']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listCSS = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listCSSItems, {tagName: 'li'} )};
        
        
        // Javascript
        // ----------
        var listJSHeader = {tagName: 'h2', innerHTML: 'JavaScript'};
        var listJSItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Javascript Compression Tool (jscompress)', 'http://jscompress.com/'],
            ['JavaScript Minifier (danstools.com)', 'http://www.danstools.com/javascript-minify/'],
            ['JavaScript Minifier (freeformatter.com)', 'http://www.freeformatter.com/javascript-minifier.html'],
            ['JavaScript Minifier (javascript-minifier.com)', 'https://javascript-minifier.com/'],
            ['Minify - JavaScript and CSS minifier', 'http://www.minifier.org/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listJS = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listJSItems, {tagName: 'li'} )};
        
        // JSON (Javascript Object Notation)
        // ----
        var listJSONHeader = {tagName: 'h2', innerHTML: 'JSON'};
        var listJSONItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['JSON Minifier', 'http://www.webtoolkitonline.com/json-minifier.html'],
            ['JSON Minify', 'http://www.cleancss.com/json-minify/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listJSON = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listJSONItems, {tagName: 'li'} )};
        
        // HTML
        // ----
        var listHTMLHeader = {tagName: 'h2', innerHTML: 'HTML'};
        var listHTMLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['HTML Minifier (willpeavy.com)', 'http://www.willpeavy.com/minifier/'],
            ['HTML Minifier (kangax.github.io)', 'https://kangax.github.io/html-minifier/']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listHTML = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listHTMLItems, {tagName: 'li'} )};
        
        // Python
        // ------
        var listPythonHeader = {tagName: 'h2', innerHTML: 'Python'};
        var listPythonItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listPython = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listPythonItems, {tagName: 'li'} )};
        
        
        // SQL (Structured Query Syntax)
        // ---
        var listSQLHeader = {tagName: 'h2', innerHTML: 'SQL'};
        var listSQLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['SQL Minifier', 'http://www.webtoolkitonline.com/sql-minifier.html']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
        var listSQL = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listSQLItems, {tagName: 'li'} )};
        
        // XML
        // ---
        var listXMLHeader = {tagName: 'h2', innerHTML: 'XML'};
        var listXMLItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Online XML Minifier', 'http://www.tutorialspoint.com/online_xml_minifier.htm'],
            ['XML Minifier', 'http://www.webtoolkitonline.com/xml-minifier.html']
            //['name','href'],
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
    
        var listXML = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listXMLItems, {tagName: 'li'} )};
        
        
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
                                     listCSSHeader, listCSS,
                                     listHTMLHeader, listHTML,
                                     listJSHeader, listJS,
                                     listJSONHeader, listJSON,
                                     //listPythonHeader, listPython,
                                     listSQLHeader, listSQL,
                                     listXMLHeader, listXML,
                                     seeAlsoHeader, seeAlso
                                    ]};
        return content;
    }, // End of content
    
    events: function() {
        
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolCodeMinify);
//console.log(WorkTool.Tools);
//console.log('ToolCodeMinify.js: ' + HtmlBuilder.buildHtmlString( ToolCodeMinify.content() ) );
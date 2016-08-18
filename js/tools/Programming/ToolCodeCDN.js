var ToolCodeCDN = ToolCodeCDN || {
    
    name: 'Content Delivery Networks (CDN)',
    category: 'Code',
    description: 'Display links to CDNs.',
    header: 'Content Delivery Networks (CDN)', // Title to appear in Tool Page
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolCodeCDN.description};
        var searchLi = [], tempLi;
        
        
        // CDN
        // ---
        var listCSSHeader = {tagName: 'h2', innerHTML: 'CDNs'};
        var listCSSItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['BootstrapCDN - Bootstrap, Font Awesome, Bootswatch', 'https://www.bootstrapcdn.com/'],
            ['CDNjs', 'https://cdnjs.com/libraries'],
            ['Chinese hosted', 'https://chineseseoshifu.com/blog/china-hosted-javascript-libraries-jquery-dojo-boostrap.html'],
            ['Google Hosted Libraries', 'https://developers.google.com/speed/libraries/'],
            ['jQuery CDN', 'https://code.jquery.com/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        //var listCSS = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listCSSItems, {tagName: 'li'} )};
        
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listCSSItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'CDNs'});
        searchLi = searchLi.concat(tempLi);
        
        // Code Libraries
        // --------------
        var listCLHeader = {tagName: 'h2', innerHTML: 'Code Libraries'};
        var listClItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['YUI Library @ Github', 'https://github.com/yui']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
       // var listCL = {tagName: 'ul', childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listClItems, {tagName: 'li'} )};
        
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listClItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'Code Libraries'});
        searchLi = searchLi.concat(tempLi);
        
        // Others
        // ------
        var searchUl = {tagName:'ul', 
                      attributes:{'data-role':'listview', 'data-inset':'true', 'data-filter':'true'}, 
                      childObjects:searchLi};
        
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [//descHeader, 
                                     descInfo, br,
                                     searchUl,
                                    ]};
        return content;
    }, // End of content
    
    pageshow: function() {
        document.getElementsByTagName('input')[1].focus(); // 0 = main page's searchbar
    },
    
    events: function() {
        
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolCodeCDN);
//console.log(WorkTool.Tools);
//console.log('ToolCodeCDN.js: ' + HtmlBuilder.buildHtmlString( ToolCodeCDN.content() ) );
var ToolDateDateTools = ToolDateDateTools || {
    
    name: 'Date Tools',
    category: 'Date',
    description: 'Tools related to Date processing',
    header: 'Date Tools', // Title to appear in Tool Page
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolDateDateTools.description};
        var searchLi = [], tempLi;
        
        
        // Websites
        // --------
        var listWebHeader = {tagName: 'h2', innerHTML: 'CDNs'};
        var listWebItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Date and Time Calculators (timeanddate.com)', 'https://www.timeanddate.com/date/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listWebItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'Websites'});
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

WorkTool.addToolToTools(ToolDateDateTools);
//console.log(WorkTool.Tools);
//console.log('ToolDateDateTools.js: ' + HtmlBuilder.buildHtmlString( ToolDateDateTools.content() ) );
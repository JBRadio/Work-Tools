var ToolRegExpRegExpTools = ToolRegExpRegExpTools || {
    
    name: 'RegExp Tools',
    category: 'Regular Expression',
    description: 'Tools related to regular expressions',
    header: 'RegExp Tools', // Title to appear in Tool Page
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
        var descInfo = {tagName: 'p', innerHTML: ToolRegExpRegExpTools.description};
        var searchLi = [], tempLi;
        
        
        // Documentation
        // -------------
        var listDocHeader = {tagName: 'h2', innerHTML: 'Documentation'};
        var listDocItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['MDN | Regular Expressions (js)', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions'],
            ['MDN | RegExp Object (js)', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listDocItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'Documentation'});
        searchLi = searchLi.concat(tempLi);
        
        // Tester/Playground
        // -----------------
        var listPGHeader = {tagName: 'h2', innerHTML: 'Tester'};
        var listPGItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['RegExr: Learn, Build, & Test RegEx', 'http://regexr.com/'],
            ['Regular Exprerssions 101 (php, js, python)', 'https://regex101.com/']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listPGItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'Tester/Playground'});
        searchLi = searchLi.concat(tempLi);
        
        // MacOS
        // -----
        var listMacHeader = {tagName: 'h2', innerHTML: 'MacOS'};
        var listMacItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['RegexToolBox', 'https://itunes.apple.com/us/app/regextoolbox/id954196690?mt=12'],
            ['Wiz RegEx', 'https://itunes.apple.com/us/app/wiz-regex/id1156096307?mt=12&ign-mpt=uo%3D4']
            //iOS: ['Regex Pro Quick Guide FREE', 'https://itunes.apple.com/us/app/regex-pro-free/id891592604?mt=8']
            //['name','href'],
            ],
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
        
        tempLi = HtmlBuilder.buildHtmlObjectsFromArray(listMacItems, {tagName: 'li'});
        tempLi.unshift({tagName:'li', attributes:{'data-role':'list-divider', 'data-theme':'b'},innerHTML:'MacOS'});
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

WorkTool.addToolToTools(ToolRegExpRegExpTools);
//console.log(WorkTool.Tools);
//console.log('ToolRegExpRegExpTools.js: ' + HtmlBuilder.buildHtmlString( ToolRegExpRegExpTools.content() ) );
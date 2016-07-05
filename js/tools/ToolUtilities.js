var ToolUtilities = ToolUtilities || {
    
    name: 'Online Utilities and Web Services',
    category: 'Utilities',
    description: 'Display a list of links leading to utilities and web services. Not a complete list.',
    header: 'Online Utilities and Web Services', // Title to appear in Tool Page
    //parameter: true,
    //parameters: ["Radio Buttons", "Capitalize", "CamelCase", "Uppercase", "Lowercase", "mixedCase"],
    content: function() { // Dependency on HTMLBUilder
        
        var br = {tagName: 'br' };
        
        var descHeader = {tagName: 'h2', innerHTML: 'Description:'};
            
        var descInfo = {tagName: 'p', innerHTML: ToolUtilities.description};
        
        var listUtilityHeader = {tagName: 'h2', innerHTML: 'Utilties:'};
        var listUtilityItems = HtmlBuilder.buildHtmlLinkObjectsFromArray([
            ['Development Tools (tutorialspoint.com)', 'http://www.tutorialspoint.com/online_dev_tools.htm'],
            ['Google Products', 'https://www.google.com/intl/en/about/products/'],
            ['If This Then That (IFTTT)', 'https://ifttt.com/'],
            ['Online Scientific and Engineering Resource', 'http://www.rapidtables.com/'],
            ['SEO Chat Free Beta Tools', 'http://tools.seochat.com/'],
            ['TextFixer - HTML, Text, Numbers', 'http://www.textfixer.com/']
            ], 
            {attributes: {target:'blank'}}
        ); // building <a> string text for <li> innerHTML
    
        var listUtility = {tagName: 'ul',
                               childObjects: HtmlBuilder.buildHtmlObjectsFromArray( listUtilityItems, {tagName: 'li'} )};
        
                         
        var content = {tagName:'div', 
                      attributes: {'data-role':'content'},
					  classes: ['ui-content'],
                      childObjects: [descHeader, descInfo, br,
                                    listUtilityHeader, listUtility 
                                     //seeAlsoHeader, seeAlsoLinkList
                                    ]};
        return content;
    }, // End of content
    
    events: function() {
        $('#btnProcess').on('click', function() { 
            var usrInput = $('#txtaInput').val().trim();
            if ( usrInput == "" || usrInput.length == 0 || usrInput == undefined ) return;    
        
        var tblRowData = [['Text:', $('#txtaInput').val().length > 0 ? $('#txtaInput').val() : '<span class="colorRed">(No text entered)</span>' ],
                          ['Character count:', $('#txtaInput').val().length ],
                          ['Word count:', wordCount],
                          ['Line count:', lineCount]];
            
        var parentTag = {tagName:'tr', IdPrefix:'TableRow'};
        var childTag = {tagName:'td', IdPrefix:'Cell'}
        var tblRowObjData = HtmlBuilder.buildHtmlObjectsFromArray2( tblRowData, [parentTag,childTag]);
            //console.log(tblRowObjData);
        var tbl = HtmlBuilder.buildHtmlString({tagName:'table',
                                               childObjects:tblRowObjData});
            //console.log(tbl);
        });
    }, // End of events (event listeners)
};

WorkTool.addToolToTools(ToolUtilities);
//console.log(WorkTool.Tools);
//console.log('ToolUtilities.js: ' + HtmlBuilder.buildHtmlString( ToolUtilities.content() ) );